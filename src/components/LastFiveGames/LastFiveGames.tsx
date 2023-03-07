import { PossibleResults } from "@/types/Team";
import { XCircle, CheckCircle, MinusCircle } from "react-feather";
import { v4 as uuidv4 } from "uuid";

const LastFiveGames = ({ games }: { games: PossibleResults[] }) => {
  const gamesWithKey = games.map((game) => {
    return { result: game, key: uuidv4() };
  });
  const WIN = "WIN";
  const LOSS = "LOSS";
  const TIE = "TIE";

  const iconMapper = {
    WIN: <CheckCircle className="h-3 w-3 text-green-800" />,
    LOSS: <XCircle className="h-3 w-3 text-red-600" />,
    TIE: <MinusCircle className="h-3 w-3 text-gray-400" />,
  };

  const Icon = ({ result }: { result: PossibleResults }) => iconMapper[result];
  return (
    <div className="flex gap-1 justify-center">
      {gamesWithKey.map((r) => (
        <Icon key={r.key} result={r.result} />
      ))}
    </div>
  );
};

export default LastFiveGames;
