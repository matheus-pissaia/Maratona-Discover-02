module.exports = {
  remainingDays(job) {
    // uso do 'toFixed()' para arredondar o número para um inteiro
    const remainingDays = (job["total-hours"] / job["daily-hours"]).toFixed();

    // Data de criação do Projeto:
    const createdJobDate = new Date(job.created_at);

    // Data de entrega do Projeto:
    const dueDay = createdJobDate.getDate() + Number(remainingDays);

    // Data de entrega transformada em milissegundos:
    const dueDateInMs = createdJobDate.setDate(dueDay);

    // Diferença de tempo em ms
    const timeDifferenceInMs = dueDateInMs - Date.now();

    // Calculo do total de ms em um dia
    const dayInMs = 1000 * 60 * 60 * 24

    // Diferença de dias com arredondamento para baixo usando o 'Math.floor':
    const dayDifference = Math.ceil(timeDifferenceInMs / dayInMs);

    return dayDifference
  },

  calculateBudget: (job, valueHour) => valueHour * job["total-hours"]
};
