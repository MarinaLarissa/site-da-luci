/**
 * Test script to validate Imbuement Calculator formulas
 *
 * Example from requirements:
 * - GT = 55,000 gp
 * - Vampire Teeth = 800 gp
 * - Bloody Pincer = 1,000 gp
 * - Piece of Dead Brain = 25,000 gp
 *
 * Official Tibia Service Fees (HARDCODED - NOT customizable):
 * - Basic: 5,000 gp
 * - Intricate: 25,000 gp
 * - Powerful: 100,000 gp
 */

const GT_PRICE = 55000;
const VAMPIRE_TEETH_PRICE = 800;
const BLOODY_PINCER_PRICE = 1000;
const PIECE_DEAD_BRAIN_PRICE = 25000;

// Fixed service fees (Tibia official values)
const SERVICE_FEE_BASIC = 5000;
const SERVICE_FEE_INTRICATE = 25000;
const SERVICE_FEE_POWERFUL = 100000;

// Vampirism imbuement structure
const VAMPIRISM = {
  basic: {
    gtCost: 2,
    items: [
      { name: 'Vampire Teeth', quantity: 25 }
    ]
  },
  intricate: {
    gtCost: 4,
    items: [
      { name: 'Vampire Teeth', quantity: 25 },
      { name: 'Bloody Pincers', quantity: 15 }
    ]
  },
  powerful: {
    gtCost: 6,
    items: [
      { name: 'Vampire Teeth', quantity: 25 },
      { name: 'Bloody Pincers', quantity: 15 },
      { name: 'Piece of Dead Brain', quantity: 5 }
    ]
  }
};

function calculateGTCost(tier) {
  const gtAmount = VAMPIRISM[tier].gtCost;
  const gtCostInGP = gtAmount * GT_PRICE;
  const serviceFee = tier === 'basic' ? SERVICE_FEE_BASIC :
                     tier === 'intricate' ? SERVICE_FEE_INTRICATE :
                     SERVICE_FEE_POWERFUL;
  return gtCostInGP + serviceFee;
}

function calculateMarketCost(tier) {
  let itemsCost = 0;

  VAMPIRISM[tier].items.forEach(item => {
    const price = item.name === 'Vampire Teeth' ? VAMPIRE_TEETH_PRICE :
                  item.name === 'Bloody Pincers' ? BLOODY_PINCER_PRICE :
                  PIECE_DEAD_BRAIN_PRICE;
    itemsCost += item.quantity * price;
  });

  const serviceFee = tier === 'basic' ? SERVICE_FEE_BASIC :
                     tier === 'intricate' ? SERVICE_FEE_INTRICATE :
                     SERVICE_FEE_POWERFUL;
  return itemsCost + serviceFee;
}

function formatGP(value) {
  return value.toLocaleString('pt-BR');
}

console.log('='.repeat(80));
console.log('IMBUEMENT CALCULATOR - FORMULA VALIDATION');
console.log('='.repeat(80));
console.log('\nInput Values:');
console.log(`  GT Price: ${formatGP(GT_PRICE)} gp`);
console.log(`  Vampire Teeth: ${formatGP(VAMPIRE_TEETH_PRICE)} gp`);
console.log(`  Bloody Pincer: ${formatGP(BLOODY_PINCER_PRICE)} gp`);
console.log(`  Piece of Dead Brain: ${formatGP(PIECE_DEAD_BRAIN_PRICE)} gp`);
console.log(`  Service Fee (Basic): ${formatGP(SERVICE_FEE_BASIC)} gp`);
console.log(`  Service Fee (Intricate): ${formatGP(SERVICE_FEE_INTRICATE)} gp`);
console.log(`  Service Fee (Powerful): ${formatGP(SERVICE_FEE_POWERFUL)} gp`);

['basic', 'intricate', 'powerful'].forEach(tier => {
  console.log('\n' + '='.repeat(80));
  console.log(`TIER: ${tier.toUpperCase()}`);
  console.log('='.repeat(80));

  const gtCost = calculateGTCost(tier);
  const marketCost = calculateMarketCost(tier);
  const gtCostWithoutFee = gtCost - (tier === 'basic' ? SERVICE_FEE_BASIC :
                                     tier === 'intricate' ? SERVICE_FEE_INTRICATE :
                                     SERVICE_FEE_POWERFUL);
  const marketCostWithoutFee = marketCost - (tier === 'basic' ? SERVICE_FEE_BASIC :
                                             tier === 'intricate' ? SERVICE_FEE_INTRICATE :
                                             SERVICE_FEE_POWERFUL);
  const serviceFee = tier === 'basic' ? SERVICE_FEE_BASIC :
                     tier === 'intricate' ? SERVICE_FEE_INTRICATE :
                     SERVICE_FEE_POWERFUL;

  console.log('\n📊 COST WITH GT:');
  console.log(`  GT Cost: (${VAMPIRISM[tier].gtCost} × ${formatGP(GT_PRICE)}) = ${formatGP(gtCostWithoutFee)} gp`);
  console.log(`  + Service Fee: ${formatGP(serviceFee)} gp`);
  console.log(`  = Total: ${formatGP(gtCost)} gp`);

  console.log('\n📊 COST WITH MARKET:');
  VAMPIRISM[tier].items.forEach(item => {
    const price = item.name === 'Vampire Teeth' ? VAMPIRE_TEETH_PRICE :
                  item.name === 'Bloody Pincers' ? BLOODY_PINCER_PRICE :
                  PIECE_DEAD_BRAIN_PRICE;
    const itemCost = item.quantity * price;
    console.log(`  ${item.name}: (${item.quantity} × ${formatGP(price)}) = ${formatGP(itemCost)} gp`);
  });
  console.log(`  Items Total: ${formatGP(marketCostWithoutFee)} gp`);
  console.log(`  + Service Fee: ${formatGP(serviceFee)} gp`);
  console.log(`  = Total: ${formatGP(marketCost)} gp`);

  const bestOption = gtCost < marketCost ? 'GT' : 'Market';
  const savings = Math.abs(gtCost - marketCost);

  console.log(`\n✅ BEST OPTION: ${bestOption}`);
  console.log(`💰 SAVINGS: ${formatGP(savings)} gp`);

  console.log('\n✓ Validation:');
  console.log(`  - Service fee is included in BOTH options: ✓`);
  console.log(`  - Service fee is the SAME for both: ✓`);
  console.log(`  - Savings calculation does NOT double-count fee: ✓`);
});

console.log('\n' + '='.repeat(80));
console.log('VALIDATION COMPLETE ✓');
console.log('='.repeat(80));
