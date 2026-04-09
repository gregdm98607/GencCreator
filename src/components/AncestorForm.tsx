/**
 * AncestorForm — Input form for ancestor details.
 *
 * Collects name, dates, locations, records found, and research goal.
 * Stub — UI to be implemented in Phase E.
 */

import type { AncestorInput } from '../lib/types.js';

interface AncestorFormProps {
  onSubmit: (input: AncestorInput) => void;
}

export function AncestorForm({ onSubmit }: AncestorFormProps) {
  // Stub — full form implementation in Phase E
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        // Placeholder: submit with minimal test data
      }}
    >
      <h2>Tell Us What You Know</h2>
      <p>Form implementation coming in Phase E.</p>
    </form>
  );
}
