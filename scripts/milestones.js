/**
 * milestones.js
 * Sistema de marcos de continuidade (tipo Nike Running)
 */

class Milestones {
  /**
   * Definição dos marcos em sequência Fibonacci
   * Conceito: "Desde X, acontece Y" - progressão quente → frio
   */
  static TIERS = [
    {
      days: 7,
      name: 'Bronze',
      label: 'Primeira Semana',
      color: 'bronze',
      icon: '🟠',
      gradient: 'var(--gradient-bronze)'
    },
    {
      days: 30,
      name: 'Prata',
      label: 'Primeiro Mês',
      color: 'silver',
      icon: '🟠',
      gradient: 'var(--gradient-silver)'
    },
    {
      days: 90,
      name: 'Ouro',
      label: '3 Meses',
      color: 'gold',
      icon: '🔴',
      gradient: 'var(--gradient-gold)'
    },
    {
      days: 180,
      name: 'Platina',
      label: 'Meio Ano',
      color: 'platinum',
      icon: '🟣',
      gradient: 'var(--gradient-platinum)'
    },
    {
      days: 365,
      name: 'Diamante',
      label: '1 Ano',
      color: 'diamond',
      icon: '🟣',
      gradient: 'var(--gradient-diamond)'
    },
    {
      days: 730,
      name: 'Safira',
      label: '2 Anos',
      color: 'sapphire',
      icon: '🔵',
      gradient: 'var(--gradient-sapphire)'
    },
    {
      days: 1095,
      name: 'Infinito',
      label: '3+ Anos',
      color: 'infinity',
      icon: '🔵',
      gradient: 'var(--gradient-infinity)'
    }
  ];

  /**
   * Obtém o marco atual baseado nos dias
   * @param {number} days - Número de dias
   * @returns {Object} Marco atual
   */
  static getCurrentMilestone(days) {
    // Começar com o primeiro marco
    let currentTier = this.TIERS[0];

    // Encontrar o maior marco que o usuário atingiu
    for (const tier of this.TIERS) {
      if (days >= tier.days) {
        currentTier = tier;
      } else {
        break;
      }
    }

    return currentTier;
  }

  /**
   * Obtém o próximo marco e progresso
   * @param {number} days - Número de dias
   * @returns {Object|null} Próximo marco com progresso, ou null se já atingiu o último
   */
  static getNextMilestone(days) {
    // Encontrar próximo marco
    for (const tier of this.TIERS) {
      if (days < tier.days) {
        const progress = ((days / tier.days) * 100).toFixed(1);
        const remaining = tier.days - days;
        return {
          tier,
          progress: parseFloat(progress),
          remaining,
          daysUntilNext: remaining
        };
      }
    }

    // Já atingiu o último marco
    return null;
  }

  /**
   * Obtém cor CSS do marco
   * @param {string} colorName - Nome da cor (bronze, silver, etc)
   * @returns {string} Variável CSS
   */
  static getColor(colorName) {
    return `var(--milestone-${colorName})`;
  }

  /**
   * Obtém gradiente CSS do marco
   * @param {string} colorName - Nome da cor
   * @returns {string} Variável CSS do gradiente
   */
  static getGradient(colorName) {
    return `var(--gradient-${colorName})`;
  }

  /**
   * Formata texto de progresso para próximo marco
   * @param {number} days - Número de dias
   * @returns {string} Texto formatado
   */
  static getProgressText(days) {
    const next = this.getNextMilestone(days);

    if (!next) {
      return 'Marco máximo atingido!';
    }

    const daysText = next.remaining === 1 ? 'dia' : 'dias';
    return `${next.remaining} ${daysText} para ${next.tier.name}`;
  }
}
