/**
 * Solo Hunt Results Component
 * Displays the final results with adjusted balance
 */

import React from 'react';
import PropTypes from 'prop-types';
import './SoloHuntResults.css';

export default function SoloHuntResults({ results }) {
  const { session, costs, adjustedBalance } = results;
  const { player } = session;

  const profitPerHour = () => {
    // Parse duration (format: "HH:MMh" or "MM:SS")
    const durationStr = session.duration;
    let hours = 0;

    if (durationStr.includes('h')) {
      const parts = durationStr.split(':');
      const hourPart = parseInt(parts[0], 10);
      const minPart = parts[1] ? parseInt(parts[1].replace('h', ''), 10) : 0;
      hours = hourPart + minPart / 60;
    }

    return hours > 0 ? (adjustedBalance / hours).toFixed(0) : 0;
  };

  return (
    <div className="solo-hunt-results">
      <h2 className="results-title">
        <span className="results-icon">📊</span> Resultados da Hunt
      </h2>

      {/* Session Info Card */}
      <div className="result-card">
        <h3>Informações da Sessão</h3>
        <div className="info-grid">
          <div className="info-item">
            <span className="label">Jogador:</span>
            <span className="value">{player.name}</span>
          </div>
          <div className="info-item">
            <span className="label">Duração:</span>
            <span className="value">{session.duration}</span>
          </div>
          <div className="info-item">
            <span className="label">Período:</span>
            <span className="value">{session.sessionInfo}</span>
          </div>
        </div>
      </div>

      {/* Loot & Supplies Card */}
      <div className="result-card">
        <h3>Loot & Supplies</h3>
        <div className="stats-grid">
          <div className="stat-item positive">
            <div className="stat-label">Loot Total</div>
            <div className="stat-value">+{player.loot.toLocaleString('pt-BR')} GP</div>
          </div>
          <div className="stat-item negative">
            <div className="stat-label">Supplies Usados</div>
            <div className="stat-value">-{player.supplies.toLocaleString('pt-BR')} GP</div>
          </div>
          <div className="stat-item neutral">
            <div className="stat-label">Balance Original</div>
            <div className="stat-value">{player.balance.toLocaleString('pt-BR')} GP</div>
          </div>
        </div>
      </div>

      {/* Additional Costs Card */}
      {costs.items.length > 0 && (
        <div className="result-card">
          <h3>Custos Adicionais</h3>
          <div className="costs-breakdown">
            <div className="cost-row">
              <span>Total em GP:</span>
              <span className="cost-value">-{costs.totalGP.toLocaleString('pt-BR')} GP</span>
            </div>
            {costs.totalGT > 0 && (
              <>
                <div className="cost-row">
                  <span>Total em GT:</span>
                  <span className="cost-value">-{costs.totalGT.toLocaleString('pt-BR')} GT</span>
                </div>
                {costs.goldTokenPrice > 0 && (
                  <div className="cost-row">
                    <span>GT convertido (@ {costs.goldTokenPrice.toLocaleString('pt-BR')} GP/GT):</span>
                    <span className="cost-value">-{(costs.totalGT * costs.goldTokenPrice).toLocaleString('pt-BR')} GP</span>
                  </div>
                )}
              </>
            )}
            {costs.totalST > 0 && (
              <>
                <div className="cost-row">
                  <span>Total em ST:</span>
                  <span className="cost-value">-{costs.totalST.toLocaleString('pt-BR')} ST</span>
                </div>
                {costs.silverTokenPrice > 0 && (
                  <div className="cost-row">
                    <span>ST convertido (@ {costs.silverTokenPrice.toLocaleString('pt-BR')} GP/ST):</span>
                    <span className="cost-value">-{(costs.totalST * costs.silverTokenPrice).toLocaleString('pt-BR')} GP</span>
                  </div>
                )}
              </>
            )}
            <div className="cost-row total-cost">
              <span>Custo Total Adicional:</span>
              <span className="cost-value">-{(costs.totalGP + (costs.totalGT * costs.goldTokenPrice) + (costs.totalST * costs.silverTokenPrice)).toLocaleString('pt-BR')} GP</span>
            </div>
          </div>
        </div>
      )}

      {/* Final Balance Card */}
      <div className={`result-card final-balance ${adjustedBalance >= 0 ? 'positive' : 'negative'}`}>
        <h3>💰 Balance Final Ajustado</h3>
        <div className="final-balance-value">
          {adjustedBalance >= 0 ? '+' : ''}{adjustedBalance.toLocaleString('pt-BR')} GP
        </div>
        <div className="profit-per-hour">
          {adjustedBalance >= 0 ? '📈' : '📉'} {profitPerHour().toLocaleString('pt-BR')} GP/h
        </div>
      </div>

      {/* Combat Stats Card */}
      {(player.damage || player.healing) && (
        <div className="result-card">
          <h3>Estatísticas de Combate</h3>
          <div className="combat-stats">
            {player.damage > 0 && (
              <div className="combat-stat">
                <span className="label">Damage Dealt:</span>
                <span className="value">{player.damage.toLocaleString('pt-BR')}</span>
              </div>
            )}
            {player.healing > 0 && (
              <div className="combat-stat">
                <span className="label">Healing:</span>
                <span className="value">{player.healing.toLocaleString('pt-BR')}</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// PropTypes validation
SoloHuntResults.propTypes = {
  results: PropTypes.shape({
    session: PropTypes.shape({
      sessionInfo: PropTypes.string,
      duration: PropTypes.string,
      player: PropTypes.shape({
        name: PropTypes.string.isRequired,
        loot: PropTypes.number.isRequired,
        supplies: PropTypes.number.isRequired,
        balance: PropTypes.number.isRequired,
        damage: PropTypes.number,
        healing: PropTypes.number,
      }).isRequired,
    }).isRequired,
    costs: PropTypes.shape({
      totalGP: PropTypes.number.isRequired,
      totalGT: PropTypes.number.isRequired,
      totalST: PropTypes.number.isRequired,
      goldTokenPrice: PropTypes.number.isRequired,
      silverTokenPrice: PropTypes.number.isRequired,
      items: PropTypes.array.isRequired,
    }).isRequired,
    adjustedBalance: PropTypes.number.isRequired,
  }).isRequired,
};