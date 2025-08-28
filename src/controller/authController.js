const User = require("../models/User");
const bcrypt = require("bcrypt");

exports.register = async (req, res) => {
  const { nome, email, senha } = req.body;

  if (!nome || !email || !senha) {
    return res.send("⚠️ Preencha todos os campos!");
  }

  const existente = await User.findByEmail(email);
  if (existente) {
    return res.send("⚠️ E-mail já cadastrado!");
  }

  const hash = await bcrypt.hash(senha, 10);
  await User.create(nome, email, hash);

  res.redirect("/login");
};

exports.login = async (req, res) => {
  const { email, senha } = req.body;

  const user = await User.findByEmail(email);
  if (!user) return res.send("❌ Usuário não encontrado");

  const match = await bcrypt.compare(senha, user.senha);
  if (!match) return res.send("❌ Senha incorreta");

  res.send(`✅ Bem-vindo, ${user.nome}!`);
};
