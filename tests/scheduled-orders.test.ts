import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address, BigInt } from "@graphprotocol/graph-ts"
import { ExecutionAdded } from "../generated/schema"
import { ExecutionAdded as ExecutionAddedEvent } from "../generated/ScheduledOrders/ScheduledOrders"
import { handleExecutionAdded } from "../src/scheduled-orders"
import { createExecutionAddedEvent } from "./scheduled-orders-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let smartAccount = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let jobId = BigInt.fromI32(234)
    let newExecutionAddedEvent = createExecutionAddedEvent(smartAccount, jobId)
    handleExecutionAdded(newExecutionAddedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("ExecutionAdded created and stored", () => {
    assert.entityCount("ExecutionAdded", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "ExecutionAdded",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "smartAccount",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "ExecutionAdded",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "jobId",
      "234"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
