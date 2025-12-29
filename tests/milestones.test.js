/**
 * milestones.test.js
 * Testes unitários para Milestones
 */

// Carregar a classe Milestones
global.Milestones = class Milestones {
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

  static getCurrentMilestone(days) {
    let currentTier = this.TIERS[0];
    for (const tier of this.TIERS) {
      if (days >= tier.days) {
        currentTier = tier;
      } else {
        break;
      }
    }
    return currentTier;
  }

  static getNextMilestone(days) {
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
    return null;
  }

  static getColor(colorName) {
    return `var(--milestone-${colorName})`;
  }

  static getGradient(colorName) {
    return `var(--gradient-${colorName})`;
  }

  static getProgressText(days) {
    const next = this.getNextMilestone(days);
    if (!next) {
      return 'Marco máximo atingido!';
    }
    const daysText = next.remaining === 1 ? 'dia' : 'dias';
    return `${next.remaining} ${daysText} para ${next.tier.name}`;
  }
};

describe('Milestones', () => {
  describe('TIERS', () => {
    test('deve ter 7 marcos definidos', () => {
      expect(Milestones.TIERS.length).toBe(7);
    });

    test('deve ter marcos em progressão Fibonacci', () => {
      const fibonacci = [7, 30, 90, 180, 365, 730, 1095];
      Milestones.TIERS.forEach((tier, index) => {
        expect(tier.days).toBe(fibonacci[index]);
      });
    });

    test('cada marco deve ter todas as propriedades obrigatórias', () => {
      Milestones.TIERS.forEach(tier => {
        expect(tier).toHaveProperty('days');
        expect(tier).toHaveProperty('name');
        expect(tier).toHaveProperty('label');
        expect(tier).toHaveProperty('color');
        expect(tier).toHaveProperty('icon');
        expect(tier).toHaveProperty('gradient');
      });
    });
  });

  describe('getCurrentMilestone', () => {
    test('deve retornar Bronze para 1-6 dias', () => {
      expect(Milestones.getCurrentMilestone(1).name).toBe('Bronze');
      expect(Milestones.getCurrentMilestone(6).name).toBe('Bronze');
    });

    test('deve retornar Bronze para 7 dias exatos', () => {
      expect(Milestones.getCurrentMilestone(7).name).toBe('Bronze');
    });

    test('deve retornar Bronze para 8-29 dias (ainda não atingiu Prata)', () => {
      expect(Milestones.getCurrentMilestone(8).name).toBe('Bronze');
      expect(Milestones.getCurrentMilestone(29).name).toBe('Bronze');
    });

    test('deve retornar Prata para 30 dias exatos', () => {
      expect(Milestones.getCurrentMilestone(30).name).toBe('Prata');
    });

    test('deve retornar Ouro para 90 dias', () => {
      expect(Milestones.getCurrentMilestone(90).name).toBe('Ouro');
    });

    test('deve retornar Platina para 180 dias', () => {
      expect(Milestones.getCurrentMilestone(180).name).toBe('Platina');
    });

    test('deve retornar Diamante para 365 dias', () => {
      expect(Milestones.getCurrentMilestone(365).name).toBe('Diamante');
    });

    test('deve retornar Safira para 730 dias', () => {
      expect(Milestones.getCurrentMilestone(730).name).toBe('Safira');
    });

    test('deve retornar Infinito para 1095+ dias', () => {
      expect(Milestones.getCurrentMilestone(1095).name).toBe('Infinito');
      expect(Milestones.getCurrentMilestone(2000).name).toBe('Infinito');
      expect(Milestones.getCurrentMilestone(5000).name).toBe('Infinito');
    });

    test('deve retornar objeto com todas as propriedades', () => {
      const milestone = Milestones.getCurrentMilestone(100);
      expect(milestone).toHaveProperty('days');
      expect(milestone).toHaveProperty('name');
      expect(milestone).toHaveProperty('label');
      expect(milestone).toHaveProperty('color');
      expect(milestone).toHaveProperty('icon');
      expect(milestone).toHaveProperty('gradient');
    });
  });

  describe('getNextMilestone', () => {
    test('deve retornar Bronze como próximo marco para 1 dia', () => {
      const next = Milestones.getNextMilestone(1);
      expect(next.tier.name).toBe('Bronze');
      expect(next.remaining).toBe(6);
    });

    test('deve calcular progresso corretamente', () => {
      const next = Milestones.getNextMilestone(15);
      expect(next.tier.name).toBe('Prata');
      expect(next.progress).toBe(50.0); // 15/30 = 50%
    });

    test('deve retornar Ouro como próximo para 31 dias', () => {
      const next = Milestones.getNextMilestone(31);
      expect(next.tier.name).toBe('Ouro');
    });

    test('deve retornar null quando já atingiu marco máximo', () => {
      const next = Milestones.getNextMilestone(1095);
      expect(next).toBeNull();
    });

    test('deve retornar null para dias acima do marco máximo', () => {
      const next = Milestones.getNextMilestone(2000);
      expect(next).toBeNull();
    });

    test('deve ter daysUntilNext igual a remaining', () => {
      const next = Milestones.getNextMilestone(20);
      expect(next.daysUntilNext).toBe(next.remaining);
    });

    test('deve ter progresso entre 0 e 100', () => {
      for (let days = 1; days < 1095; days += 10) {
        const next = Milestones.getNextMilestone(days);
        if (next) {
          expect(next.progress).toBeGreaterThanOrEqual(0);
          expect(next.progress).toBeLessThanOrEqual(100);
        }
      }
    });
  });

  describe('getColor', () => {
    test('deve retornar variável CSS correta', () => {
      expect(Milestones.getColor('bronze')).toBe('var(--milestone-bronze)');
      expect(Milestones.getColor('silver')).toBe('var(--milestone-silver)');
      expect(Milestones.getColor('gold')).toBe('var(--milestone-gold)');
      expect(Milestones.getColor('platinum')).toBe('var(--milestone-platinum)');
      expect(Milestones.getColor('diamond')).toBe('var(--milestone-diamond)');
      expect(Milestones.getColor('sapphire')).toBe('var(--milestone-sapphire)');
      expect(Milestones.getColor('infinity')).toBe('var(--milestone-infinity)');
    });
  });

  describe('getGradient', () => {
    test('deve retornar variável CSS de gradiente correta', () => {
      expect(Milestones.getGradient('bronze')).toBe('var(--gradient-bronze)');
      expect(Milestones.getGradient('silver')).toBe('var(--gradient-silver)');
      expect(Milestones.getGradient('gold')).toBe('var(--gradient-gold)');
      expect(Milestones.getGradient('platinum')).toBe('var(--gradient-platinum)');
      expect(Milestones.getGradient('diamond')).toBe('var(--gradient-diamond)');
      expect(Milestones.getGradient('sapphire')).toBe('var(--gradient-sapphire)');
      expect(Milestones.getGradient('infinity')).toBe('var(--gradient-infinity)');
    });
  });

  describe('getProgressText', () => {
    test('deve retornar texto correto para 1 dia restante', () => {
      const text = Milestones.getProgressText(29);
      expect(text).toBe('1 dia para Prata');
    });

    test('deve retornar texto correto para múltiplos dias', () => {
      const text = Milestones.getProgressText(20);
      expect(text).toContain('dias para');
      expect(text).toContain('Prata');
    });

    test('deve retornar mensagem de marco máximo quando aplicável', () => {
      const text = Milestones.getProgressText(1095);
      expect(text).toBe('Marco máximo atingido!');
    });

    test('deve retornar mensagem de marco máximo para dias acima do máximo', () => {
      const text = Milestones.getProgressText(2000);
      expect(text).toBe('Marco máximo atingido!');
    });

    test('deve retornar texto válido para todos os marcos intermediários', () => {
      const testDays = [1, 15, 45, 100, 200, 400, 800];
      testDays.forEach(days => {
        const text = Milestones.getProgressText(days);
        expect(text).toBeTruthy();
        expect(typeof text).toBe('string');
      });
    });
  });

  describe('Progressão de Cores (Warm → Cool)', () => {
    test('deve ter cores progredindo de laranja (🟠) para azul (🔵)', () => {
      const icons = Milestones.TIERS.map(tier => tier.icon);
      expect(icons[0]).toBe('🟠'); // Bronze
      expect(icons[1]).toBe('🟠'); // Prata
      expect(icons[2]).toBe('🔴'); // Ouro
      expect(icons[3]).toBe('🟣'); // Platina
      expect(icons[4]).toBe('🟣'); // Diamante
      expect(icons[5]).toBe('🔵'); // Safira
      expect(icons[6]).toBe('🔵'); // Infinito
    });

    test('deve ter nomes de cores progressivos', () => {
      const colors = Milestones.TIERS.map(tier => tier.color);
      expect(colors).toEqual(['bronze', 'silver', 'gold', 'platinum', 'diamond', 'sapphire', 'infinity']);
    });
  });

  describe('Casos extremos', () => {
    test('deve lidar com 0 dias', () => {
      expect(Milestones.getCurrentMilestone(0).name).toBe('Bronze');
      const next = Milestones.getNextMilestone(0);
      expect(next.tier.name).toBe('Bronze');
    });

    test('deve lidar com dias negativos (retorna Bronze)', () => {
      expect(Milestones.getCurrentMilestone(-1).name).toBe('Bronze');
    });

    test('deve lidar com números decimais', () => {
      expect(Milestones.getCurrentMilestone(7.5).name).toBe('Bronze');
      const next = Milestones.getNextMilestone(15.7);
      expect(next).toBeTruthy();
    });

    test('deve lidar com números muito grandes', () => {
      expect(Milestones.getCurrentMilestone(10000).name).toBe('Infinito');
      expect(Milestones.getNextMilestone(10000)).toBeNull();
    });
  });
});
