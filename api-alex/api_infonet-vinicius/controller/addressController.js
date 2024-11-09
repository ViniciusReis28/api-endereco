const pool = require('../config/db');

exports.createAddress = async (req, res) => {
  const { rua, bairro, cidade, estado } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO endereco (rua, bairro, cidade, estado) VALUES ($1, $2, $3, $4) RETURNING *',
      [rua, bairro, cidade, estado]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao criar endereço' });
  }
};

exports.getAllAddresses = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM endereco');
    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao obter endereços' });
  }
};

exports.getOneAddress = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('SELECT * FROM endereco WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Endereço não encontrado' });
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao obter o endereço' });
  }
};

exports.updateAddress = async (req, res) => {
  const { id } = req.params;
  const { rua, bairro, cidade, estado } = req.body;

  try {
    const result = await pool.query(
      'UPDATE endereco SET rua = $1, bairro = $2, cidade = $3, estado = $4 WHERE id = $5 RETURNING *',
      [rua, bairro, cidade, estado, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Endereço não encontrado' });
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao atualizar endereço' });
  }
};

exports.deleteAddress = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('DELETE FROM endereco WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Endereço não encontrado' });
    }
    res.status(200).json({ message: 'Endereço deletado com sucesso' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao remover endereço' });
  }
};
