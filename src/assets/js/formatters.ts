export const formatDate = (datetime: string) => {
	const targetDate = new Date(datetime);
	const tempMonth = targetDate.getMonth() + 1;
	const targetMonth = tempMonth.toString().padStart(2, '0');
	const targetMinutes = targetDate.getMinutes().toString().padStart(2, '0');
	
	const date = `${targetDate.getDate().toString().padStart(2, '0')}.${targetMonth}.${targetDate.getFullYear()}`;
	const time = `${targetDate.getHours().toString().padStart(2, '0')}:${targetMinutes}`;
	
	return {date: date, time: time}
}