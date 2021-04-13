const Profile = require('../model/Profile');

module.exports = {
  async index(req, res) {
    return res.render("profile", { profile: await Profile.get() });
  },

  async update(req, res) {
    // req.body para pegar os dados
    const data = req.body;

    // definir qunatas semanas tem em 1 ano
    const weeksPerYear = 52;

    // remover as semanas de férias do ano, para obter o numero de semanas em 1 mes
    const weeksPerMonth = (weeksPerYear - data["vacation-per-year"]) / 12;

    // quantas horas por semana eu estou trabalhando
    const weekTotalHours = data["hours-per-day"] * data["days-per-week"];

    // horas trabalhadas no mês
    const monthlyTotalHours = weekTotalHours * weeksPerMonth;

    // cálculo do valor da 'minha' hora:
    const valueHour = data["value-hour"] = data["monthly-budget"] / monthlyTotalHours;

    const profile = await Profile.get();

    await Profile.update({
      ...profile,
      ...req.body,
      "value-hour": valueHour,
    });

    return res.redirect('/profile');
  }
}
