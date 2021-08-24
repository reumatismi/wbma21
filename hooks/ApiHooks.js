import {useEffect, useState} from 'react';
import {baseUrl} from '../utils/variables';
import {doFetch} from '../utils/http';

const useMedia = () => {
  const [mediaArray, setMediaArray] = useState([]);
  useEffect(() => {
    (async () => {
      setMediaArray(await loadMedia());
    })(); // self-invoking function CHECK CHECK
  }, []);

  const loadMedia = async () => {
    try {
      const mediaIlmanThumbNailia = await doFetch(baseUrl + 'media');
      const kaikkiTiedot = mediaIlmanThumbNailia.map(async (media) => {
        try {
          return await loadSingleMedia(media.file_id);
        } catch (e) {
          return {};
        }
      });
      return Promise.all(kaikkiTiedot);
    } catch (e) {
      console.log('List.js - List: ', e.message());
    }
  };

  const loadSingleMedia = async (id) => {
    try {
      const tiedosto = await doFetch(baseUrl + 'media/' + id);
      return tiedosto;
    } catch (e) {
      console.log('loadMedia' + e.message);
    }
  };

  return {mediaArray, loadSingleMedia, loadMedia};
};

export {useMedia};
