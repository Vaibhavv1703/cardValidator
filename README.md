# Card Validator

Lightweight vanilla JavaScript credit/debit card number validator and brand detector. It formats input as you type, identifies the card network (Visa, MasterCard, American Express, Discover, RuPay, or Unknown), and validates the number using the Luhn checksum algorithm—all in a single, framework‑free page.

## Features
- Live input formatting: groups digits in blocks of 4 automatically.
- Card type detection by BIN/IIN ranges and length rules.
- Luhn algorithm validation for checksum integrity.
- Supports variable lengths (13–19) where appropriate.
- Stylish dark UI with custom fonts.
- No external dependencies; easy to embed elsewhere.

## Supported Card Types & Rules
| Type | Lengths | Detection Logic (simplified) |
|------|---------|------------------------------|
| Visa | 13–19 | Starts with `4` |
| MasterCard | 16 | `51–55` or `2221–2720` |
| American Express | 15 | `34` or `37` |
| Discover | 16–19 | `6011`, `65`, `644–649`, `622126–622925` |
| RuPay | 16 | Prefixes: `5085`, `6521`, `6522`, or `353`, `356`, `607`, `652`, `814` |
| Unknown | — | Anything else not matching above |

You can extend detection by adding new prefix ranges inside `detectCardType(num)` in `app.js`.

## Project Structure
```
card_Validator/
  index.html      # Minimal HTML shell
  app.js          # Formatting, card type detection, Luhn validation
  styles.css      # Dark theme + font + button animations
  Assets/Fonts/   # Custom font files used in UI
```

## Core Logic Overview
### Input Formatting
```
digits.replace(/(.{4})/g, "$1 ").trim();
```
Strips non‑digits, trims length to 19, then inserts spaces after every 4 digits.

### Card Type Detection (Excerpt)
```
if (num[0] === '4') return 'Visa';
// MasterCard: 51–55 or 2221–2720
// Amex: 34/37
// Discover: multiple ranges including 6011, 65, 644–649, 622126–622925
```
Uses slices of 2–6 digits and numeric range checks.

### Luhn Algorithm
Iterates digits from right to left, doubling every second digit, subtracting 9 if result > 9, sums, and checks `sum % 10 === 0`.
```
for (let i = number.length - 1; i >= 0; i--) {
  let digit = parseInt(number[i], 10);
  if (shouldDouble) {
    digit *= 2;
    if (digit > 9) digit -= 9;
  }
  sum += digit;
  shouldDouble = !shouldDouble;
}
```

## Test Numbers (Non‑Production)
Use standard dummy numbers (they pass Luhn but are not real accounts):
- Visa: `4111 1111 1111 1111`
- MasterCard: `5555 5555 5555 4444`
- American Express: `3782 822463 10005`
- Discover: `6011 1111 1111 1117`

RuPay test numbers vary; ensure they match specified prefixes and pass Luhn.

## Extending Detection
Add new ranges near the bottom of `detectCardType(num)`. Example for a hypothetical range:
```
// ExampleNet: prefix 123456, length 16
if (len === 16 && prefix6 === '123456') return 'ExampleNet';
```
Maintain ordering from most specific to generic to avoid false positives.


## Styling
Custom fonts loaded with `@font-face` from `Assets/Fonts/`. Colors and theme variables centralized in `:root` for easy theming.

## License
Not yet specified.

## Author
Created by Vaibhav.

---
Feel free to open an issue or suggest improvements.