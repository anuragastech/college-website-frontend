const HolidayButton = ({ day, isHoliday, onToggle }) => {
    return (
      <button
        onClick={() => onToggle(day)}
        className={`px-3 py-1 rounded ${
          isHoliday ? 'bg-red-500' : 'bg-green-500'
        } text-white`}
      >
        {isHoliday ? 'Unmark Holiday' : 'Mark as Holiday'}
      </button>
    );
  };
  
  export default HolidayButton;
  