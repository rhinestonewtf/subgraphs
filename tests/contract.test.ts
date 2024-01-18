import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll,
} from "matchstick-as/assembly/index";
import { Address, BigInt, Bytes } from "@graphprotocol/graph-ts";
import { ExecutionExecuted } from "../generated/schema";
import { ExecutionExecuted as ExecutionExecutedEvent } from "../generated/VirtualColdStorage/VirtualColdStorage";
import { handleExecutionExecuted } from "../src/virtualColdStorage";
import { createExecutionExecutedEvent } from "./contract-utils";

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let subAccount = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    );
    let target = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    );
    let value = BigInt.fromI32(234);
    let callData = Bytes.fromI32(1234567890);
    let newExecutionExecutedEvent = createExecutionExecutedEvent(
      subAccount,
      target,
      value,
      callData
    );
    handleExecutionExecuted(newExecutionExecutedEvent);
  });

  afterAll(() => {
    clearStore();
  });

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("ExecutionExecuted created and stored", () => {
    assert.entityCount("ExecutionExecuted", 1);

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "ExecutionExecuted",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "subAccount",
      "0x0000000000000000000000000000000000000001"
    );
    assert.fieldEquals(
      "ExecutionExecuted",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "target",
      "0x0000000000000000000000000000000000000001"
    );
    assert.fieldEquals(
      "ExecutionExecuted",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "value",
      "234"
    );
    assert.fieldEquals(
      "ExecutionExecuted",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "callData",
      "1234567890"
    );

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  });
});
