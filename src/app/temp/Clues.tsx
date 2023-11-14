const getClues = async function(word: string) {

  const response = await fetch(`https://api.api-ninjas.com/v1/thesaurus?word=${word}`, {
    headers: { 'X-Api-Key': '+J71cPB9FYuOr+hgjXPHAA==x1N63HIhndpoopFx' }
  });

  const data = await response.json();
  return data;

};

interface Props {
  word: string;
}

export default async function Clues({ word }: Props) {
  const clues = await getClues(word);
  
  const clueList = clues.synonyms.map((clue: string) => {
    return <li key={clue} className="synonym">{clue.toUpperCase()}</li>;
  });


  return (
    <>
      {clues.synonyms.length > 0
        ?
        <ul>{clueList}</ul>
        :
        <p className="synonym">No synonyms found</p>
      }
    </>
  );
}
