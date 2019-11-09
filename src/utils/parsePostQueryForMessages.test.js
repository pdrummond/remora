import { parsePostQueryForMessages } from "./parsePostQueryForMessages";

/*
    See comments in parsePostQueryForMessages.js for more info on 
    how pagination works. 
*/

describe("parsePostQueryForMessages", () => {
  test("No pagination scenario 1", () => {
    /*
        If the first item in the newest messages list is the same
        as the last item in the oldest messages list then the 
        overlapping item should be removed and there is no need for 
        pagination so isMoreMessages should be false. 
    */

    const oldest = [
      { id: 1, content: "message 1" },
      { id: 2, content: "message 2" },
      { id: 3, content: "message 3" }
    ];

    const newest = [
      { id: 3, content: "message 3" },
      { id: 4, content: "message 4" },
      { id: 5, content: "message 5" },
      { id: 6, content: "message 6" }
    ];

    const {
      oldestMessages,
      newestMessages,
      isMoreMessages
    } = parsePostQueryForMessages(oldest, newest);
    expect(oldestMessages.length).toBe(3);
    expect(newestMessages.length).toBe(3);
    expect(isMoreMessages).toBe(false);
  });

  test("With pagination", () => {
    /*
        If the first item in the newest messages list is NOT same
        as the last item in the oldest messages list then there are more
        messages to load so isMoreMessages should be true. 

        This logic works except for one case - see next test below.
    */

    const oldest = [
      { id: 1, content: "message 1" },
      { id: 2, content: "message 2" },
      { id: 3, content: "message 3" }
    ];

    const newest = [
      { id: 40, content: "message 40" },
      { id: 50, content: "message 50" },
      { id: 60, content: "message 60" }
    ];

    const {
      oldestMessages,
      newestMessages,
      isMoreMessages
    } = parsePostQueryForMessages(oldest, newest);
    expect(oldestMessages.length).toBe(3);
    expect(newestMessages.length).toBe(3);
    expect(isMoreMessages).toBe(true);
  });

  test("No pagination scenario 2", () => {
    /*
        If the first item in the newest messages list is NOT same
        as the last item in the oldest messages list but there are exactly
        that number of messages on the server then there will still be no
        overlap but the client will think there are more messages. 

        So in this scenario, as far as the client is concerned it is correct
        for isMoreMessages to be true for this scenario. The "more messages"
        divider will appear then the user will click it and no message will
        be returned adn the "more messages" divder will disappear at that 
        point. This is acceptable given how relatively rare this sceanrio 
        will be in practice. 
        
    */

    const oldest = [
      { id: 1, content: "message 1" },
      { id: 2, content: "message 2" },
      { id: 3, content: "message 3" }
    ];

    const newest = [
      { id: 4, content: "message 4" },
      { id: 5, content: "message 5" },
      { id: 6, content: "message 6" },
      { id: 7, content: "message 7" }
    ];

    const {
      oldestMessages,
      newestMessages,
      isMoreMessages
    } = parsePostQueryForMessages(oldest, newest);
    expect(oldestMessages.length).toBe(3);
    expect(newestMessages.length).toBe(4);
    expect(isMoreMessages).toBe(true);
  });

  test("Many overlapping messages scenario 1", () => {
    /*
        When the user selects to load more messages, it's possible for the
        list of messages returned to include some or all of the newest messages.

        This function handles this scenario by removing all overlapping 
        messages from the newest messages array. If the result is that 
        the newest messages array is zero, then isMoreMessages will be false. 

        SCENARIO 1: In this case, there will be one message remaining in the 
        newest array, so isMoreMessages will be true. 
    */

    const oldest = [
      { id: 1, content: "message 1" },
      { id: 2, content: "message 2" },
      { id: 3, content: "message 3" },
      { id: 4, content: "message 4" },
      { id: 5, content: "message 5" },
      { id: 6, content: "message 6" }
    ];

    const newest = [
      { id: 4, content: "message 4" },
      { id: 5, content: "message 5" },
      { id: 6, content: "message 6" },
      { id: 7, content: "message 7" }
    ];

    const {
      oldestMessages,
      newestMessages,
      isMoreMessages
    } = parsePostQueryForMessages(oldest, newest);
    expect(oldestMessages.length).toBe(6);
    expect(newestMessages.length).toBe(1);
    expect(isMoreMessages).toBe(true);
  });

  test("Many overlapping messages scenario 2", () => {
    /*
        When the user selects to load more messages, it's possible for the
        list of messages returned to include some or all of the newest messages.

        This function handles this scenario by removing all overlapping 
        messages from the newest messages array. If the result is that 
        the newest messages array is zero, then isMoreMessages will be false. 

        SCENARIO 2: In this case, there will be no message remaining in the 
        newest array, so isMoreMessages will be false. 
    */

    const oldest = [
      { id: 1, content: "message 1" },
      { id: 2, content: "message 2" },
      { id: 3, content: "message 3" },
      { id: 4, content: "message 4" },
      { id: 5, content: "message 5" },
      { id: 6, content: "message 6" }
    ];

    const newest = [
      { id: 4, content: "message 4" },
      { id: 5, content: "message 5" },
      { id: 6, content: "message 6" }
    ];

    const {
      oldestMessages,
      newestMessages,
      isMoreMessages
    } = parsePostQueryForMessages(oldest, newest);
    expect(oldestMessages.length).toBe(6);
    expect(newestMessages.length).toBe(0);
    expect(isMoreMessages).toBe(false);
  });

  test("No messages", () => {
    const {
      oldestMessages,
      newestMessages,
      isMoreMessages
    } = parsePostQueryForMessages([], []);
    expect(oldestMessages.length).toBe(0);
    expect(newestMessages.length).toBe(0);
    expect(isMoreMessages).toBe(false);
  });
});
