import { useMemo } from "react";
import { useLoaderContext } from "src/Appv2/Loader";
import {
  getVoteTimeLeftInWords,
  isVoteActiveProposal,
  getVoteBlocksLeft,
  isPublicProposal
} from "./helpers";

export function useProposalVoteInfo(proposal) {
  const { apiInfo } = useLoaderContext();

  if (!isPublicProposal(proposal)) {
    return {};
  }

  const bestBlock =
    proposal && proposal.voteStatus && proposal.voteStatus.bestblock;

  const voteTimeLeft = useMemo(
    () => getVoteTimeLeftInWords(proposal, bestBlock, apiInfo.testnet),
    [bestBlock]
  );

  const voteBlocksLeft = useMemo(() => getVoteBlocksLeft(proposal, bestBlock));

  const voteActive = isVoteActiveProposal(proposal);

  return {
    voteActive,
    voteTimeLeft,
    voteBlocksLeft
  };
}