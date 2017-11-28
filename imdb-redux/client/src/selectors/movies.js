import moment from 'moment';

// Get visible movies

export default (movies, { text, sortBy, startDate, endDate }) => {
  return movies
    .filter(movie => {
      const createdAtMoment = moment(movie.createdAt);
      const startDateMatch = startDate ? startDate.isSameOrBefore(createdAtMoment, 'day') : true;
      const endDateMatch = endDate ? endDate.isSameOrAfter(createdAtMoment, 'day') : true;
      const textMatch = movie.description.toLowerCase().includes(text.toLowerCase());

      return startDateMatch && endDateMatch && textMatch;
    })
    .sort((a, b) => {
      if (sortBy === 'date') {
        return a.createdAt < b.createdAt ? 1 : -1;
      } else if (sortBy === 'price') {
        return a.price < b.price ? 1 : -1;
      }
    });
};
