import { authFetch } from '../../app/api';

export async function fetchAssets(userId) {
  const [assetsRes, txRes] = await Promise.all([
    authFetch(`http://localhost:5001/activos?user_id=${userId}`),
    authFetch(`http://localhost:5001/transacciones?user_id=${userId}`)
  ]);

  if (!assetsRes.ok || !txRes.ok) {
    throw new Error('Error al obtener datos');
  }

  const assetsData = await assetsRes.json();
  const txData = await txRes.json();

  const userAssets = assetsData;

  return userAssets.map(asset => {
    const txs = txData.filter(tx => tx.asset_id === asset.id);

    let totalQty = 0;
    let totalCost = 0;

    txs.forEach(tx => {
      const qty = parseFloat(tx.quantity);
      const price = parseFloat(tx.price);

      if (tx.type === "buy") {
        totalQty += qty;
        totalCost += qty * price;
      } else if (tx.type === "sell") {
        totalQty -= qty;
      }
    });

    const avgPurchasePrice = totalQty > 0 ? totalCost / totalQty : 0;

    return {
      ...asset,
      quantity: totalQty,
      purchasePrice: avgPurchasePrice,
      currentValue: asset.current_price
    };
  });
}