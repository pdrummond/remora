/*
  newestMessages must contain one extra message to oldestMessages. This is
  how we detect if there are any more messages or not - if there is an 
  overlap between the last old message and the first new message then 
  there are no more messages to load. 
  
  Note this function also removes the overlapping message if it is detected. 
*/

export function parsePostQueryForMessages(oldestMessages, newestMessages) {
  const oldest = oldestMessages;
  const newest = newestMessages.sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );

  let isMoreMessages =
    oldest.length > 0 && newest[0].id !== oldest[oldest.length - 1].id;

  //Remove any overlapping entries from newest
  let difference = newest.filter(x => !oldest.find(y => y.id === x.id));

  if (isMoreMessages === true && difference.length === 0) {
    isMoreMessages = false;
  }

  return {
    oldestMessages: oldest,
    newestMessages: difference,
    isMoreMessages
  };
}
