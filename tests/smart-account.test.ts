import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { BigInt, Address, Bytes } from "@graphprotocol/graph-ts"
import { ModuleInstalled } from "../generated/schema"
import { ModuleInstalled as ModuleInstalledEvent } from "../generated/SmartAccount/SmartAccount"
import { handleModuleInstalled } from "../src/smart-account"
import { createModuleInstalledEvent } from "./smart-account-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let moduleTypeId = BigInt.fromI32(234)
    let module = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let newModuleInstalledEvent = createModuleInstalledEvent(
      moduleTypeId,
      module
    )
    handleModuleInstalled(newModuleInstalledEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("ModuleInstalled created and stored", () => {
    assert.entityCount("ModuleInstalled", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "ModuleInstalled",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "moduleTypeId",
      "234"
    )
    assert.fieldEquals(
      "ModuleInstalled",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "module",
      "0x0000000000000000000000000000000000000001"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
