# How to Contribute Data to Open Supply Hub

> Sources:
>
> - [Preparing data for upload](https://info.opensupplyhub.org/resources/preparing-data)
> - [Making the most of Open Supply Hub](https://info.opensupplyhub.org/resources/making-the-most-of-open-supply-hub)

## Part 1: Preparing Your Data

Follow these step-by-step instructions to prepare your data via a CSV or Excel file.

**IMPORTANT:** You must use the OS Hub template to upload data. Do not modify the column headers, remove or add columns to the template.

### Data Points Included in the Template

- **country** (required)
- **name** (required)
- **address** (required)
- **sector_product_type** (highly recommended)
- **facility_type_processing_type** (optional)
- **number_of_workers** (optional)
- **parent_company** (optional)

### Templates

- [Excel Template (with GPS coordinates)](https://open-supply.files.svdcdn.com/production/assets/downloads/OS_Hub_Data_Template_GPS.xlsx?dm=1758718399) — Use this template to upload GPS coordinates (latitude and longitude) in addition to address. Format: Decimal Degrees, rounded to max 7 decimal places.
- [Deluxe Embedded Map Users](https://info.opensupplyhub.org/embedded-map) receive a custom template.

### General Tips

- Remove duplicates from your list. The OS Hub algorithm will check whether the facilities already exist in OS Hub and match them accordingly, but it will not remove duplicates within your list.
- Separate your plots/units/buildings. Only upload one plot/unit/building per row.
- Ensure your facility names and addresses have fewer than 200 characters in a cell.
- Do not use quotation marks (" ") and em dashes (—) in your file.
- Remove any Excel formulas.
- Save your file as an Excel file (.xlsx) or as a CSV UTF-8 (.csv). Excel is preferred.
- File size limit: 5MB.

### Required Data Points

#### country (required)

The country in which the production location is located. Must be translated into English. Refer to the ISO [alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) or [alpha-3](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-3) country names.

#### name (required)

The complete name of the production location. Include incorporation details (Pvt., Ltd., etc.). Translate any non-roman characters to Roman/English equivalent. Do not include a person's name and address without a registered business.

#### address (required)

The most specific address available for the location. Addresses must be complete: include street number, street name, city and zip/postal code. If street name/number are not available, use neighborhood or village name. Translate any non-roman characters to Roman/English equivalent. Remove Post Office Boxes (P.O. Box, Caixa Postal, Apartado Postal) from the address.

### Optional Data Points

If you do not have this information, leave that column/cell blank. Do not enter N/A or other filler text.

#### sector_product_type (highly recommended)

Contains two data points: the products or components produced at the location AND the sector the product or components belong to. Use ONLY sector values from the Open Supply Hub [list of supported sector values](https://docs.google.com/document/d/12gDb4WlMHwaAE0iYVmbOjNJ_T7ICqntp-Ddd1qfbhCg/edit#heading=h.tnf5hn3volep). Separate multiple values using a comma (,) or a vertical bar (|).

#### facility_type_processing_type (optional)

Contains two data points: the activities that occur at the production location (processing type) and higher-level categories (facility type). For apparel facilities, use values from the OS Hub [Facility Type Taxonomy](https://docs.google.com/spreadsheets/d/18ABJuS5CY4cr9JaTzPeLaAr1uhdu7VJXK6JpibP1b1o/edit?usp=sharing). For non-apparel facilities, submit any processing type data you have. Separate multiple values using a comma (,) or a vertical bar (|).

#### number_of_workers (optional)

The number of people working at the production location. Only raw values (e.g. 1000) or ranges (e.g. 1000-2000) are accepted. Do not include commas.

#### parent_company (optional)

If applicable, the company or manufacturing group which owns the production location.

---

## Part 2: Making the Most of Open Supply Hub

Congratulations! You've uploaded your data to Open Supply Hub. Now that you have contributed to an open and collaborative supply chain platform, there are many ways you can make the most of this tool.

### See Who Else Is Connected to Your Facilities

Looking to collaborate with other organizations who also work with the same facilities? Easily identify potential collaborators for shared auditing and reporting, new programs or investments, remediation and more.

- **Focused on a specific facility?** Search for that facility in OS Hub. Then, take a look at the other organizations listed on that facility profile.
- **Interested in collaborating?** See where your lists overlap by searching for both of your data contributions and then checking the "Show only shared facilities" box.
- **Want to understand which organizations' lists overlap with yours?** Download your list from OS Hub to get information about which other organizations are connected to each of your facilities.

### Share Your Data Contribution

Link directly to your data on OS Hub from your website or [embed it as a map](https://info.opensupplyhub.org/embedded-map), so your users can easily search, navigate through and/or download your data. [Free graphics](https://info.opensupplyhub.org/resources/assets-for-stakeholders) are also available for use.

### Access Your OS IDs

Each of your facilities now has its own OS ID. These free, universal IDs can be used to make it easy to share facility data with others:

- Share your facilities' OS IDs when providing data to other stakeholders, so they can easily line their facility data up with yours.
- Incorporate them into your own internal systems as a "decoder" ID across platforms and service providers.

Download your data from Open Supply Hub to access the OS IDs for your facilities.

### Encourage Facilities to Claim Their Profiles

Reach out to your facilities to notify them that their facility is now listed on OS Hub. By claiming their facilities, facility owners or senior management can add additional details to their profiles, including MOQs, lead times, certifications, gender-breakdown of workers, and more.

### Upgrade Your OS Hub Experience

Check out [premium services](https://info.opensupplyhub.org/pricing) to make the most of Open Supply Hub.
