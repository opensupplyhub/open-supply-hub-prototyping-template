# RFC — Production Locations Endpoint Schema

> Source: Internal RFC

## Summary

This document contains an explanation of how the current `GET /v1/production-locations` endpoint data is aggregated and describes each field of the production location data object.

## Background

During the implementation of the target architecture, specifically its search capability, this RFC along with the [API documentation](https://github.com/opensupplyhub/open-supply-hub-api-docs) serves as a guiding factor in the implementation process. The intention is to clarify the schema of the `/v1/production-locations` endpoint, as well as the data transformations applied to meet business use cases.

## Problem

We are working to align business needs for the endpoint with the technical capabilities and limitations of the software:

- List data transformations and data types to establish a shared understanding of the limitations and possibilities of the new endpoint.
- Create a "source of truth" regarding the new schema and how we plan to implement it.
- Enable engineers and product teams to collaborate on the schema.

## Solution

List every field in the production location schema, align on how that data is computed, and decide which heuristics to apply.

### Heuristics

#### Priority Based

1. Data from the approved claim.
2. Promoted matches (considered as promoted facility list items).
3. The most recently contributed data.

**Example:** For the location `name` field:

- Approved claim: `Huai An Yuan Tong Headwear Mfg. Co., Ltd.` — this wins.
- If not claimed, promoted match: `Huai An Yuan Tong Headwea`
- If no promoted matches, latest contribution: `Huai An Yuan Tong`

#### Aggregation Based

1. Take all contributions for a particular field (sorted by Priority Based heuristic).
2. Remove duplicate values.
3. (Optional but RECOMMENDED) Limit the resulting array to `n` most recent values.

**Example:** Input: `["Zaber & Zubair Fabrics Ltd", "Zaber & Zubair Fabrics Ltd (extension)", "ZABER & ZUBAIR FABRICS LTD", "Zaber & Zubair Fabrics LTD", "ZABER & ZUBAIR FABRICS LTD"]`. After deduplication: `["Zaber & Zubair Fabrics Ltd", "Zaber & Zubair Fabrics Ltd (extension)"]`.

### Schema

---

#### OS ID

- **Property:** `os_id`
- **Type:** `string`
- **Description:** The unique identifier for a location.
- **Example:** `CN2021250D1DTN7`
- **Heuristic:** N/A

---

#### Name

- **Property:** `name`
- **Type:** `string`
- **Description:** The name of the location (preferably in English).
- **Example:** `Huai An Yuan Tong Headwear Mfg. Co., Ltd.`
- **Heuristic:** Priority Based

---

#### Alternate Names

- **Property:** `alternate_names`
- **Type:** `array<string>`
- **Description:** List of previous names of the production location for search purposes.
- **Example:** `["HUAI AN YUAN TONG", "Huai'an Yuantong Headwear Mfg. Co", "Huaian Yuan Tong Headwear"]`
- **Heuristic:** Aggregation Based

---

#### Local Name

- **Property:** `name_local`
- **Type:** `string`
- **Description:** The name of the location in the original language.
- **Example:** `淮安市元通帽业制造有限公司`
- **Heuristic:** Priority Based

---

#### Description

- **Property:** `description`
- **Type:** `string`
- **Description:** Description of the location provided by the claimant.
- **Example:** `Manufactures womens hats, baseball caps, round hats, and other products.`
- **Heuristic:** Priority Based

---

#### Address

- **Property:** `address`
- **Type:** `string`
- **Description:** The address of the location.
- **Example:** `No.30 & 32 & 99 Yan Huang Avenue, Lian Shui Economic Developmental District, Huaian, Jiangsu - China`
- **Heuristic:** Priority Based

---

#### Alternate Addresses

- **Property:** `alternate_adresses`
- **Type:** `array<string>`
- **Description:** List of alternate addresses for search purposes.
- **Example:** `["No. 1 Yan Huang Avenue Lian Shui Lian Shui", "NO 30 YAN HUANG AVENUE HUAI AN Jiangsu 223400"]`
- **Heuristic:** Aggregation Based

---

#### Business URL

- **Property:** `business_url`
- **Type:** `string`
- **Description:** The location's website URL provided by the contributor.
- **Example:** `https://opensupplyhub.org/facilities/CN2021250D1DTN7`
- **Heuristic:** Priority Based

---

#### Sector

- **Property:** `sector`
- **Type:** `array<string>`
- **Description:** The sector that the location operates in.
- **Example:** `["Apparel, Apparel Accessories", "Sporting Goods", "Unspecified"]`
- **Heuristic:** Aggregation Based

---

#### Parent Company

- **Property:** `parent_company`
- **Type:** `array<string>`
- **Description:** The name of the parent company of the location.
- **Example:** `["Asi Global Limited", "ASI GLOBAL LIMITED", "Asian Sourcing International Limited"]`
- **Heuristic:** Aggregation Based

---

#### Product Type

- **Property:** `product_type`
- **Type:** `array<string>`
- **Description:** The product types that the location produces.
- **Example:** `["Accessories", "Headwear", "Hats", "Caps"]`
- **Heuristic:** Aggregation Based

---

#### Location Type

- **Property:** `location_type`
- **Type:** `array<string>`
- **Description:** The type of location this location represents.
- **Example:** `["Final Product Assembly", "Garment Accessories Manufacturing", "Finished Goods", "Manufacturing Factory"]`
- **Heuristic:** Aggregation Based

---

#### Processing Type

- **Property:** `processing_type`
- **Type:** `array<string>`
- **Description:** The type of processing activity that takes place at this location.
- **Example:** `["Cut & sew", "Knitting", "Packing"]`
- **Heuristic:** Aggregation Based

---

#### Number Of Workers

- **Property:** `number_of_workers`
- **Type:** `object`
- **Description:** The number of workers employed at a location.
- **Example:** `{ "min": 100, "max": 1000 }`
- **Heuristic:** Priority Based

---

#### Coordinates

- **Property:** `coordinates`
- **Type:** `object`
- **Description:** The geographic coordinates of the location.
- **Example:** `{ "lat": 33.7862099, "lon": 119.2787399 }`
- **Heuristic:** Priority Based

---

#### Minimum Order Quantity

- **Property:** `minimum_order_quantity`
- **Type:** `number`
- **Description:** Indicates the minimum order quantity accepted by the location.
- **Example:** `25000`
- **Heuristic:** N/A

---

#### Average Lead Time

- **Property:** `average_lead_time`
- **Type:** `string`
- **Description:** The minimum time that a location needs to produce an order.
- **Example:** `90-120 Days`
- **Heuristic:** Priority Based

---

#### Percent Female Workers

- **Property:** `percent_female_workers`
- **Type:** `number`
- **Description:** The percentage of female employees at the location.
- **Example:** `0.97`
- **Heuristic:** Priority Based

---

#### Affiliations

- **Property:** `affiliations`
- **Type:** `array<string>`
- **Description:** Indicates if the location is affiliated with any industry initiatives.
- **Example:** `["SEDEX", "Social and Labor Convergence Plan (SLCP)"]`
- **Heuristic:** Aggregation Based

---

#### Certifications, Standards, Regulations

- **Property:** `certifications_standards_regulations`
- **Type:** `array<string>`
- **Description:** Indicates if the location is compliant with any certification, standards, or regulations.
- **Example:** `["FSCGlobal", "Higg Index", "Global Recycling Standard (GRS)"]`
- **Heuristic:** Aggregation Based

---

#### Country

- **Property:** `country`
- **Type:** `object`
- **Description:** Country the facility is located in.
- **Example:** `{ "alpha_2": "GB" }`
- **Heuristic:** Priority Based

---

#### Claim Status

- **Property:** `claim_status`
- **Type:** `string`
- **Description:** Indicates whether a location has been claimed by an owner or manager (`claimed`, `unclaimed` or `pending`).
- **Example:** `claimed`
- **Heuristic:** N/A

---

#### Historical OS ID

- **Property:** `historical_os_id`
- **Type:** `array<string>`
- **Description:** Lists all of the OS IDs that location was assigned to in the past, so users can find the location based on old IDs.
- **Example:** `["CN2021250D1DTN7", "BD2021113R7R87P", "CN2019083DCWXWP"]`
- **Heuristic:** Aggregation Based

---

#### Contributors

- **Property:** `contributors`
- **Type:** `array<object>`
- **Description:** List of contributor ids containing all the users that have contributed to this particular location.
- **Example:** `[{ "id": 44, "type": "Test" }]`
- **Heuristic:** Aggregation Based

---

#### Number Of Contributors

- **Property:** `number_of_contributors`
- **Type:** `number`
- **Description:** Number of contributors that have contributed to this particular location.
- **Example:** `49`
- **Heuristic:** Aggregation Based

---

#### Contributor Lists

- **Property:** `lists`
- **Type:** `array<object>`
- **Description:** Array of lists that this production location relates to.
- **Example:** `[{ "id": 13, "contributor_id": 142, "name": "Test list" }]`
- **Heuristic:** Aggregation Based

---

#### DUNS

- **Property:** `duns_id`
- **Type:** `string`
- **Description:** The DUNS ID (Data Universal Numbering System) of the location.
- **Example:** `"15-048-3782"`
- **Heuristic:** Priority Based

---

#### LEI

- **Property:** `lei_id`
- **Type:** `string`
- **Description:** The LEI ID (Legal Entity Identifier) of the location.
- **Example:** `"529900T8BM49AURSDO55"`
- **Heuristic:** Priority Based

---

#### RBA Online ID

- **Property:** `rba_id`
- **Type:** `string`
- **Description:** The RBA ID of the location.
- **Example:** `"RBA-12345678"`
- **Heuristic:** Priority Based
