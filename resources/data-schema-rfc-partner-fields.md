# RFC — Partner Fields Object

> Source: Internal RFC

## Summary

Partner Field system to support JSON Schema validation. Specifically, it introduces a mechanism to validate `object` type fields against a defined schema at the API level. Furthermore, it details frontend logic to parse these schemas and render clickable links based on specific formats: direct URIs (using `format: "uri"`) and constructed reference URIs (using `format: "uri-reference"` combined with a configured `base_url`).

## Background

Open Supply Hub aims to simplify the integration of partner data. Currently, creating custom validations for different integrations requires writing custom code. By adopting the universal standard JSON Schema, we can ensure data quality more efficiently and use it to drive the UI display.

## Problem

1. There is currently no way to ensure that data submitted to `object` type Partner Fields adheres to a specific structure.
2. Partner Fields containing URLs or reference codes (like FIPS codes) are displayed as static text. Users cannot click through to external resources.

## Solution

### Schema Validation (API Level)

- Admins SHALL be able to provide a JSON Schema when creating or editing a Partner Field of type `object`.
- When an API user submits data for a Partner Field, the system MUST validate the input against the attached JSON Schema. If the input does not conform, the submission MUST be rejected with a validation error.

### Dynamic Link Rendering (Frontend)

The frontend MUST dynamically render hyperlinks based on the JSON Schema properties defined for the Partner Field.

#### Direct URIs (`format: "uri"`)

If a property in the schema has `"format": "uri"`:

1. The value becomes the `href` attribute.
2. The system MUST look for a sibling property with the same name plus a `_text` suffix (e.g., `url` and `url_text`).
   - If the `_text` property exists and is populated, its value is used as the visible link text.
   - If the `_text` property is missing, the URL value itself is used as the visible text.
3. The link MUST open in a new tab (`target="_blank"`).

#### Constructed URIs (`format: "uri-reference"`)

The `PartnerField` model is extended with two optional fields: `base_url` (URL template) and `display_text` (static label).

If a property in the schema has `"format": "uri-reference"` (e.g., a FIPS code):

1. The Partner Field configuration MUST have both `base_url` and `display_text` populated.
2. The system MUST URL-encode the property value and append it to the `base_url`.
   - Example: `base_url` = `https://livingwage.mit.edu/counties/` + `value` = `53041` → `https://livingwage.mit.edu/counties/53041`
3. The configured `display_text` is used as the visible link text.
4. If `base_url` or `display_text` are missing, the value SHALL be displayed as plain text.

## Appendix: Implementation Example

### Admin Configuration

The Administrator configures a partner field named `cool_field`:

- **Field Name:** `cool_field`
- **Base URL:** `https://www.example.com/`
- **Display Text:** `Cool Field URL`
- **JSON Schema:**

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "Some Data",
  "type": "object",
  "properties": {
    "fips_code": {
      "title": "FIPS Code",
      "description": "Code that creates a standardized, numeric 'address' for places",
      "type": "string",
      "format": "uri-reference"
    },
    "url": {
      "title": "Audit report URL",
      "description": "The URL for the audit report",
      "type": "string",
      "format": "uri"
    },
    "url_text": {
      "title": "Link text for audit report",
      "description": "Text to be displayed for the URL",
      "type": "string"
    }
  }
}
```

### API Submission

A user submits the following data payload:

```json
{
  "cool_field": {
    "fips_code": "1234567890",
    "url": "https://www.example.com/audit-2024",
    "url_text": "Audit report"
  }
}
```

### Rendering Logic

- **Logic A (`uri-reference`):** Detects `fips_code`. Combines the Field's `base_url` with the submitted value. Uses the Field's static `display_text`.
- **Logic B (`uri`):** Detects `url`. Uses the submitted value as the href. Looks for the sibling `url_text` property to use as the label.

### Final Output

**Link 1 (from `fips_code`):**

```html
<a href="https://www.example.com/1234567890" target="_blank">Cool Field URL</a>
```

**Link 2 (from `url`):**

```html
<a href="https://www.example.com/audit-2024" target="_blank">Audit report</a>
```
