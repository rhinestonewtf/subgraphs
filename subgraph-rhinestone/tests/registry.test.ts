import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address, Bytes, BigInt } from "@graphprotocol/graph-ts"
import { Attested } from "../generated/schema"
import { Attested as AttestedEvent } from "../generated/Registry/Registry"
import { handleAttested } from "../src/registry"
import { createAttestedEvent } from "./registry-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let subject = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let attester = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let schema = Bytes.fromI32(1234567890)
    let dataPointer = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let newAttestedEvent = createAttestedEvent(
      subject,
      attester,
      schema,
      dataPointer
    )
    handleAttested(newAttestedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("Attested created and stored", () => {
    assert.entityCount("Attested", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "Attested",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "subject",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "Attested",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "attester",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "Attested",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "schema",
      "1234567890"
    )
    assert.fieldEquals(
      "Attested",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "dataPointer",
      "0x0000000000000000000000000000000000000001"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
