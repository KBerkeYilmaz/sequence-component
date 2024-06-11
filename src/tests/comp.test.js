import { render, fireEvent } from "@testing-library/react";
import SequenceMailSettings from "components/SequenceMailSettings";

// Mock the updateSelectedDays function
const mockUpdateSelectedDays = jest.fn();

jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useState: (initial) => [initial, mockUpdateSelectedDays],
}));

describe("SequenceMailSettings", () => {
  const DAYS = [
    { label: "Mon", value: "mon" },
    { label: "Tue", value: "tue" },
    { label: "Wed", value: "wed" },
    { label: "Thr", value: "thr" },
    { label: "Fri", value: "fri" },
    { label: "Sat", value: "sat" },
    { label: "Sun", value: "sun" },
  ];

  it("renders the days correctly", () => {
    const { getByLabelText } = render(<SequenceMailSettings />);

    DAYS.forEach((day) => {
      expect(getByLabelText(day.label)).toBeInTheDocument();
    });
  });

  it("checks and unchecks the checkboxes", () => {
    const { getByLabelText } = render(<SequenceMailSettings />);

    DAYS.forEach((day) => {
      const checkbox = getByLabelText(day.label);
      fireEvent.click(checkbox);
      expect(mockUpdateSelectedDays).toHaveBeenCalledWith(day.value);
    });
  });
});
