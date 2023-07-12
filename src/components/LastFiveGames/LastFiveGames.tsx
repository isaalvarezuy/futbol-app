import { Game, GameResults } from "@/types/models/Game";
import { XCircle, CheckCircle, MinusCircle } from "react-feather";
import IconWrapper from "../IconWrapper/IconWrapper";

const LastFiveGames = ({ games }: { games: Game[] }) => {
  const iconMapper = {
    [GameResults.WIN]: <CheckCircle className="text-green-800" />,
    [GameResults.LOSS]: <XCircle className="text-red-600" />,
    [GameResults.TIE]: <MinusCircle className="text-gray-400" />,
  };

  return (
    <div className="flex gap-1 justify-center">
      {games.map((game) => (
        <IconWrapper key={game._id} size={12}>
          {iconMapper[game.result]}
        </IconWrapper>
      ))}
    </div>
  );
};

export default LastFiveGames;
