export type RootStackParamList = {
  Turmas: undefined;
  NovaTurma: undefined;
  DetalhesTurma: {
    turma: {
      id?: number;
      nome: string;
      participantes?: { id: number; nome: string; time: string }[];
    };
  };
};
