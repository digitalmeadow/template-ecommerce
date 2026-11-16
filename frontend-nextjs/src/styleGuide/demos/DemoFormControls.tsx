// Native controls inside the global form classes: rest, invalid and disabled.
export default function DemoFormControls() {
  return (
    <div className="g-grid-cols-2 gap-10">
      <label className="g-form-field">
        Text
        <input type="text" placeholder="Placeholder" />
      </label>
      <label className="g-form-field">
        Dropdown
        <select>
          <option>Order</option>
          <option>Returns</option>
        </select>
      </label>
      <label className="g-form-field">
        Invalid
        <input type="email" defaultValue="rider@" aria-invalid="true" />
        <span className="g-form-error g-text-small">Enter a valid email address.</span>
      </label>
      <label className="g-form-field">
        Disabled
        <input type="text" placeholder="Placeholder" disabled />
      </label>
      <label className="g-form-field">
        Long text
        <textarea placeholder="How can we help?" />
      </label>
      <fieldset className="g-form-field">
        <legend>Choices</legend>
        <label className="g-form-choice">
          <input type="checkbox" defaultChecked /> Checked
        </label>
        <label className="g-form-choice">
          <input type="checkbox" /> Unchecked
        </label>
        <label className="g-form-choice">
          <input type="radio" name="sg-radio" defaultChecked /> Selected
        </label>
        <label className="g-form-choice">
          <input type="radio" name="sg-radio" /> Not selected
        </label>
        <label className="g-form-choice">
          <input type="checkbox" defaultChecked disabled /> Disabled
        </label>
      </fieldset>
    </div>
  );
}
