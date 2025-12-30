/**
 * Session Data Input Component
 * Allows user to paste session data from TIBIA client (single player only)
 */

import React from 'react';
import './SessionDataInput.css';

export default function SessionDataInput({ sessionData, setSessionData, onParse, parsedSession }) {
  const handleLoadExample = () => {
    const example = `Session data: From 2025-12-28, 17:30:17 to 2025-12-28, 21:01:41
Session: 03:31h
Loot Type: Leader
Loot: 16,048,186
Supplies: 1,943,593
Balance: 14,104,593

Lofi Shades (Leader)
\tLoot: 14,313,399
\tSupplies: 219,690
\tBalance: 14,093,709
\tDamage: 16,030,727
\tHealing: 378,775`;

    setSessionData(example);
  };

  return (
    <div className="session-data-input">
      <h2 className="section-title">Dados da Sessão</h2>
      <p className="section-description">
        Cole os dados da sua sessão solo abaixo. <strong>Apenas 1 jogador é permitido.</strong>
      </p>

      <textarea
        className="session-textarea"
        value={sessionData}
        onChange={(e) => setSessionData(e.target.value)}
        placeholder="Cole aqui os dados da sessão do TIBIA..."
        rows={12}
      />

      <div className="input-actions">
        <button
          className="btn btn-primary"
          onClick={onParse}
          disabled={!sessionData.trim()}
        >
          Processar Dados
        </button>
        <button
          className="btn btn-secondary"
          onClick={handleLoadExample}
        >
          Carregar Exemplo
        </button>
      </div>

      {/* Show parsed session info */}
      {parsedSession && (
        <div className="parsed-session-info">
          <h3>✅ Sessão Processada</h3>
          <div className="session-summary">
            <p><strong>Jogador:</strong> {parsedSession.player.name}</p>
            <p><strong>Duração:</strong> {parsedSession.duration}</p>
            <p><strong>Loot:</strong> {parsedSession.player.loot.toLocaleString('pt-BR')} GP</p>
            <p><strong>Supplies:</strong> {parsedSession.player.supplies.toLocaleString('pt-BR')} GP</p>
            <p><strong>Balance Original:</strong> {parsedSession.player.balance.toLocaleString('pt-BR')} GP</p>
          </div>
        </div>
      )}
    </div>
  );
}
