import { Converter } from '../converter/Converter';

export interface Feed {
    id?: string; 
    Perfil?: string;
    usuarioName?: string;
    titulo: string;
    corpo: string;
    local: string;
    data: Date; 
    imagem?: string; 
    createdAt: Date;
    usuarioId?: string;
    photoURL?:string;
}

export const FeedConverter: Converter<Feed> = {
    toFirestore: (data) => data, 
    fromFirestore: (snapshot, options) => {
     
      const obj = snapshot.data(options)!;
  
      return {
        ...obj, 
        data: obj['data']?.toDate(), 
        createdAt: obj['createdAt']?.toDate(),
      } as Feed;
    },
  };
