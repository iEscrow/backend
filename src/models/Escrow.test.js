// src/models/__tests__/Escrow.test.js
require("dotenv").config();
const sequelize = require("../db");
const Escrow = require("./Escrow");

describe("Escrow model", () => {
  beforeAll(async () => {
    await sequelize.sync(); // Sincronizar modelos con la base de datos en memoria
  });

  test("creates a new escrow record", async () => {
    const escrow = await Escrow.create({
      payer_id: 1,
      payer_crypto_from: "BTC",
      payer_wallet_from: "1ABC123",
      payer_crypto_to: "ETH",
      payer_wallet_to: "0x1234",
      payee_id: 2,
      payee_crypto_from: "ETH",
      payee_wallet_from: "0x5678",
      payee_crypto_to: "BTC",
      payee_wallet_to: "2XYZ456",
      status: "pending",
    });
    expect(escrow.payer_id).toBe(1);
    expect(escrow.payer_crypto_from).toBe("BTC");
    expect(escrow.payer_wallet_from).toBe("1ABC123");
    expect(escrow.payer_crypto_to).toBe("ETH");
    expect(escrow.payer_wallet_to).toBe("0x1234");
    expect(escrow.payee_id).toBe(2);
    expect(escrow.payee_crypto_from).toBe("ETH");
    expect(escrow.payee_wallet_from).toBe("0x5678");
    expect(escrow.payee_crypto_to).toBe("BTC");
    expect(escrow.payee_wallet_to).toBe("2XYZ456");
    expect(escrow.status).toBe("pending");
  });

  afterAll(async () => {
    try {
      await sequelize.close();
      console.log("Conexión cerrada correctamente.");
    } catch (error) {
      console.error("Error al cerrar la conexión a la base de datos:", error);
    }
  });
});
