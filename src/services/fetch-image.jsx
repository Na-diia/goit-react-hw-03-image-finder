import axios from 'axios';

export const fetchImage = async (searchValue, page) => {
  const { data } = await axios.get('https://pixabay.com/api/', {
    params: {
      q: searchValue,
      page,
      key: '31877303-2b698a4e9870a1907176d2e6a',
      image_type: 'photo',
      orientation: 'horizontal',
      per_page: 12,
    },
  });

  return data;
};