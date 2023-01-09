export const compareDatesByDay = (dateA: Date, dateB: Date): 1 | -1 | 0 => {
  const dateANoTime = new Date(dateA.getFullYear(), dateA.getMonth(), dateA.getDate());
  const dateBNoTime = new Date(dateB.getFullYear(), dateB.getMonth(), dateB.getDate());

  if (dateANoTime.getTime() > dateBNoTime.getTime()) {
    return 1; // дата A больше даты B
  } else if (dateANoTime.getTime() < dateBNoTime.getTime()) {
    return -1; // дата A меньше даты B
  } else {
    return 0; // даты равны
  }
}
