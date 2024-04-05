const { ethers } = require("ethers");
const MasterWallet = require("../models/MasterWallet");


// Controlador para crear una nueva wallet maestra
async function createMasterWallet(req, res) {
  try {
    const provider = new ethers.providers.JsonRpcProvider(process.env.PROVIDER_URL_SEPOLIA);
    const randomWallet = ethers.Wallet.createRandom();
    const connectedWallet = randomWallet.connect(provider);
    const { address, privateKey } = connectedWallet;
    const wallet = await MasterWallet.create({ address, privateKey });
    res.status(201).json(wallet);
  } catch (error) {
    console.error('Error al crear la wallet maestra:', error);
    res.status(500).json({ message: 'Error al crear la wallet maestra' });
  }
}

// Controlador para obtener todas las wallets maestras
async function getAllMasterWallets(req, res) {
  try {
    const wallets = await MasterWallet.findAll();
    res.status(200).json(wallets);
  } catch (error) {
    console.error('Error al obtener las wallets maestras:', error);
    res.status(500).json({ message: 'Error al obtener las wallets maestras' });
  }
}

// Controlador para obtener una wallet maestra por su ID
async function getMasterWalletById(req, res) {
  const { id } = req.params;
  try {
    const wallet = await MasterWallet.findByPk(id);
    if (!wallet) {
      return res.status(404).json({ message: 'Wallet maestra no encontrada' });
    }
    res.status(200).json(wallet);
  } catch (error) {
    console.error('Error al obtener la wallet maestra:', error);
    res.status(500).json({ message: 'Error al obtener la wallet maestra' });
  }
}

// Controlador para eliminar una wallet maestra por su ID
async function deleteMasterWalletById(req, res) {
  const { id } = req.params;
  try {
    const wallet = await MasterWallet.findByPk(id);
    if (!wallet) {
      return res.status(404).json({ message: 'Wallet maestra no encontrada' });
    }
    await wallet.destroy();
    res.status(204).end();
  } catch (error) {
    console.error('Error al eliminar la wallet maestra:', error);
    res.status(500).json({ message: 'Error al eliminar la wallet maestra' });
  }
}

module.exports = {
  createMasterWallet,
  getAllMasterWallets,
  getMasterWalletById,
  deleteMasterWalletById
};
