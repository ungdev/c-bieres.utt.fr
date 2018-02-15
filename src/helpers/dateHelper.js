exports.monthToString = (i) => {
    const months = {
        0: "janvier",
        1: "février",
        2: "mars",
        3: "avril",
        4: "mai",
        5: "juin",
        6: "juillet",
        7: "aout",
        8: "septembre",
        9: "octobre",
        10: "novembre",
        11: "décembre"
    }

    return months[i];
}

exports.toHumanDate = (date) => {
  const eventDate = new Date(date)
  return `${eventDate.getUTCDate()}/${eventDate.getUTCMonth() + 1}/${eventDate.getUTCFullYear()}`
}

exports.isPast = (date) => {
  return new Date(date).getTime() <= new Date().getTime() - 24*60*60*1000
}
