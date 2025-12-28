import { describe, it, expect, beforeAll, afterAll } from '@jest/globals';
import request from 'supertest';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import routes from '../../src/presentation/routes/index.js';
import { errorHandler } from '../../src/presentation/middlewares/errorHandler.js';

describe('Loot Split API - Integration Tests', () => {
  let app;

  const validSessionText = `Session data: From 2025-12-25, 17:48:04 to 2025-12-25, 20:56:53
Session: 03:08h
Loot Type: Leader
Loot: 12,937,605
Supplies: 1,051,291
Balance: 11,886,314

Lofi Shades (Leader)
  Loot: 12,120,799
  Supplies: 179,781
  Balance: 11,941,018
  Damage: 17,660,082
  Healing: 785,634

Luciana Burks
  Loot: 277,020
  Supplies: 381,162
  Balance: -104,142
  Damage: 17,145,590
  Healing: 9,169,753

Young Vex
  Loot: 539,786
  Supplies: 490,348
  Balance: 49,438
  Damage: 18,737,566
  Healing: 2,666,860`;

  beforeAll(() => {
    // Setup Express app with all middleware (simulate real server)
    app = express();
    app.use(helmet());
    app.use(cors());
    app.use(express.json());
    app.use(morgan('dev'));
    app.use('/api', routes);
    app.use(errorHandler); // Error handler must be last
  });

  describe('POST /api/loot-split/calculate', () => {
    describe('Happy Path - Valid Input', () => {
      it('should return 200 and correct response structure with valid loot data', async () => {
        // Act
        const response = await request(app)
          .post('/api/loot-split/calculate')
          .send({ rawText: validSessionText })
          .expect('Content-Type', /json/)
          .expect(200);

        // Assert
        expect(response.body).toHaveProperty('success', true);
        expect(response.body).toHaveProperty('data');
        expect(response.body.data).toHaveProperty('summary');
        expect(response.body.data).toHaveProperty('players');
        expect(response.body.data).toHaveProperty('transfers');
        expect(response.body.data).toHaveProperty('copyableText');
      });

      it('should return correct summary with formatted values', async () => {
        // Act
        const response = await request(app)
          .post('/api/loot-split/calculate')
          .send({ rawText: validSessionText })
          .expect(200);

        // Assert
        const { summary } = response.body.data;
        expect(summary.totalBalance).toBe(11886314);
        expect(summary.totalBalanceFormatted).toBe('11.89kk');
        expect(summary.fairShare).toBe(3962105);
        expect(summary.fairShareFormatted).toBe('3.96kk');
        expect(summary.duration).toBe('03:08h');
        expect(summary.durationMinutes).toBe(188);
        expect(summary.activePlayers).toBe(3);
        expect(summary.profitPerHour).toBeDefined();
        expect(summary.profitPerHourFormatted).toBeDefined();
      });

      it('should return players with correct balances and roles', async () => {
        // Act
        const response = await request(app)
          .post('/api/loot-split/calculate')
          .send({ rawText: validSessionText })
          .expect(200);

        // Assert
        const { players } = response.body.data;
        expect(players).toHaveLength(3);

        const lofi = players.find((p) => p.name === 'Lofi Shades');
        expect(lofi.isLeader).toBe(true);
        expect(lofi.balance).toBe(11941018);
        expect(lofi.role).toBe('creditor'); // Has excess money
        expect(lofi.isActive).toBe(true);

        const luciana = players.find((p) => p.name === 'Luciana Burks');
        expect(luciana.balance).toBe(-104142);
        expect(luciana.role).toBe('debtor'); // Needs money
        expect(luciana.isActive).toBe(true);
      });

      it('should return transfers in correct format', async () => {
        // Act
        const response = await request(app)
          .post('/api/loot-split/calculate')
          .send({ rawText: validSessionText })
          .expect(200);

        // Assert
        const { transfers } = response.body.data;
        expect(transfers).toBeInstanceOf(Array);
        expect(transfers.length).toBeGreaterThan(0);

        transfers.forEach((transfer) => {
          expect(transfer).toHaveProperty('from');
          expect(transfer).toHaveProperty('to');
          expect(transfer).toHaveProperty('amount');
          expect(typeof transfer.from).toBe('string');
          expect(typeof transfer.to).toBe('string');
          expect(typeof transfer.amount).toBe('number');
          expect(transfer.amount).toBeGreaterThan(0);
        });
      });

      it('should return copyableText with correct TIBIA transfer commands', async () => {
        // Act
        const response = await request(app)
          .post('/api/loot-split/calculate')
          .send({ rawText: validSessionText })
          .expect(200);

        // Assert
        const { copyableText } = response.body.data;
        expect(typeof copyableText).toBe('string');
        expect(copyableText).toContain('transfer');
        expect(copyableText).toContain('to');
        // Should have format: "transfer AMOUNT to PLAYER"
        expect(copyableText).toMatch(/transfer \d+ to [A-Za-z\s]+/);
      });
    });

    describe('Edge Cases', () => {
      it('should handle single player session (no transfers needed)', async () => {
        const singlePlayerText = `Session data: From 2025-12-25, 17:48:04 to 2025-12-25, 20:56:53
Session: 01:00h
Loot Type: Leader
Loot: 1,000,000
Supplies: 100,000
Balance: 900,000

Solo Player (Leader)
  Loot: 1,000,000
  Supplies: 100,000
  Balance: 900,000
  Damage: 5,000,000
  Healing: 500,000`;

        // Act
        const response = await request(app)
          .post('/api/loot-split/calculate')
          .send({ rawText: singlePlayerText })
          .expect(200);

        // Assert
        const { transfers, copyableText } = response.body.data;
        expect(transfers).toHaveLength(0);
        expect(copyableText).toBe(''); // No transfers needed
      });

      it('should handle players with profit/waste adjustments', async () => {
        const textWithAdjustments = `Session data: From 2025-12-25, 17:48:04 to 2025-12-25, 20:56:53
Session: 02:00h
Loot Type: Leader
Loot: 3,000,000
Supplies: 500,000
Balance: 2,500,000

Player A (Leader)
  Loot: 1,500,000
  Supplies: 200,000
  Balance: 1,300,000
  Damage: 10,000,000
  Healing: 500,000
  Profit: 50,000

Player B
  Loot: 1,500,000
  Supplies: 300,000
  Balance: 1,200,000
  Damage: 8,000,000
  Healing: 300,000
  Waste: 30,000`;

        // Act
        const response = await request(app)
          .post('/api/loot-split/calculate')
          .send({ rawText: textWithAdjustments })
          .expect(200);

        // Assert
        expect(response.body.success).toBe(true);
        const { players } = response.body.data;

        const playerA = players.find((p) => p.name === 'Player A');
        expect(playerA.netBalance).toBe(1300000 + 50000); // balance + profit

        const playerB = players.find((p) => p.name === 'Player B');
        expect(playerB.netBalance).toBe(1200000 - 30000); // balance - waste
      });
    });

    describe('Validation Errors - 400 Bad Request', () => {
      it('should return 400 when rawText is missing', async () => {
        // Act
        const response = await request(app)
          .post('/api/loot-split/calculate')
          .send({})
          .expect('Content-Type', /json/)
          .expect(400);

        // Assert
        expect(response.body).toHaveProperty('success', false);
        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toHaveProperty('message');
        expect(response.body.error.message).toMatch(/rawText/i);
      });

      it('should return 400 when rawText is empty string', async () => {
        // Act
        const response = await request(app)
          .post('/api/loot-split/calculate')
          .send({ rawText: '' })
          .expect(400);

        // Assert
        expect(response.body.success).toBe(false);
        expect(response.body.error.message).toMatch(/rawText.*empty|required/i);
      });

      it('should return 400 when rawText is not a string', async () => {
        // Act
        const response = await request(app)
          .post('/api/loot-split/calculate')
          .send({ rawText: 12345 })
          .expect(400);

        // Assert
        expect(response.body.success).toBe(false);
        expect(response.body.error.message).toMatch(/rawText.*string/i);
      });

      it('should return 400 when rawText is too short', async () => {
        // Act
        const response = await request(app)
          .post('/api/loot-split/calculate')
          .send({ rawText: 'short' })
          .expect(400);

        // Assert
        expect(response.body.success).toBe(false);
      });
    });

    describe('Parser Errors - 400 Bad Request', () => {
      it('should return 400 with invalid loot data format', async () => {
        // Act
        const response = await request(app)
          .post('/api/loot-split/calculate')
          .send({ rawText: 'Invalid loot data that cannot be parsed' })
          .expect(400);

        // Assert
        expect(response.body.success).toBe(false);
        expect(response.body.error).toHaveProperty('message');
        expect(response.body.error).toHaveProperty('code');
      });

      it('should return 400 when session header is missing', async () => {
        const invalidText = `Lofi Shades (Leader)
  Loot: 12,120,799
  Supplies: 179,781
  Balance: 11,941,018`;

        // Act
        const response = await request(app)
          .post('/api/loot-split/calculate')
          .send({ rawText: invalidText })
          .expect(400);

        // Assert
        expect(response.body.success).toBe(false);
      });
    });

    describe('Server Errors - 500 Internal Server Error', () => {
      it('should handle unexpected errors gracefully', async () => {
        // This test verifies error handler middleware catches all errors
        // We simulate this by sending malformed JSON (if server mishandles it)

        // For now, we just verify error handler exists and returns proper format
        // Real 500 errors would be caught by errorHandler middleware

        // Note: This is a placeholder - real 500 scenarios would need mocking
        // internal use case failures or database errors
        expect(true).toBe(true); // Placeholder assertion
      });
    });
  });

  describe('Health Check (optional)', () => {
    it('should return 404 for undefined routes', async () => {
      // Act & Assert
      await request(app)
        .get('/api/undefined-route')
        .expect(404);
    });
  });
});