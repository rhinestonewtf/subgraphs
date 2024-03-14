import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address, BigInt } from "@graphprotocol/graph-ts"
import { AutoSaveExecuted } from "../generated/schema"
import { AutoSaveExecuted as AutoSaveExecutedEvent } from "../generated/AutoSavings/AutoSavings"
import { handleAutoSaveExecuted } from "../src/auto-savings"
import { createAutoSaveExecutedEvent } from "./auto-savings-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let smartAccount = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let token = Address.fromString("0x0000000000000000000000000000000000000001")
    let amountReceived = BigInt.fromI32(234)
    let newAutoSaveExecutedEvent = createAutoSaveExecutedEvent(
      smartAccount,
      token,
      amountReceived
    )
    handleAutoSaveExecuted(newAutoSaveExecutedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("AutoSaveExecuted created and stored", () => {
    assert.entityCount("AutoSaveExecuted", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "AutoSaveExecuted",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "smartAccount",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "AutoSaveExecuted",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "token",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "AutoSaveExecuted",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "amountReceived",
      "234"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
