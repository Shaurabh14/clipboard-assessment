const { deterministicPartitionKey } = require("./dpk");
const mockDpk = jest.fn(deterministicPartitionKey);

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });

  it("accepts an event object with partitionKey property", () => {
    const key = mockDpk({
      partitionKey: "key",
    });

    expect(mockDpk).toHaveBeenCalledWith({ partitionKey: "key" });
  });

  it("returns a string when passed a number", () => {
    const key = deterministicPartitionKey(123);
    expect(typeof key).toBe("string");
  });

  it("returns a string when passed an object partition is also a string", () => {
    const key = deterministicPartitionKey({
      partitionKey: "123",
    });
    expect(typeof key).toBe("string");
  });

  it("returns a string when passed an object partition is a number", () => {
    const key = deterministicPartitionKey({
      partitionKey: 123,
    });
    expect(typeof key).toBe("string");
  });

  it("Short keys don't get hashed with event object", () => {
    const key = deterministicPartitionKey({
      partitionKey: "Hello world",
    });
    expect(key).toBe("Hello world");
  });

  it("no event object hashes input", () => {
    const key = deterministicPartitionKey("hello world");
    expect(key).toBe(
      "59c0d8f192e89d8bcc0c7411bdc2c3ee3d50b152b7b1e5e006c9e71e7e6a8b12343b0fe02be7091bac1d485ad2d76f7734a8be02b2495cfa3d11cae2fa5e4947"
    );
  });

  it("Long inputs get hashed", () => {
    const key = deterministicPartitionKey(
      "Shaurabh Kumar is a Lead Full stack engineer in 7Eleven, this string is greater than 256 characters. Hello world! I hope this test works. My favorite sport is Cricket I think it's awesome. I like to read books. My favorite book is the Monk who sold his ferrari. So long and thanks for all the fish"
    );
    expect(key).toBe(
      "e79e9c4400b06e6f41c31d2f70cbf5611d568a8d2c4d579a1c06137ee1146beb6344043b36e0495a24faec2acf863cccc0d4456c4611d265ffc95f599e41635b"
    );
  });
});
