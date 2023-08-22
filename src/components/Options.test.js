import Options from "../components/Options";
import {render, fireEvent} from "@testing-library/react-native";

describe("Options Component", () => {
  describe("Rendering Text Tests", () => {
    it("renders Blog text", () => {
      const {getByTestId} = render(<Options />);
      const blogText = getByTestId("blog-text");
      expect(blogText).toHaveTextContent(/Blog/);
    });
    it("renders News and Events text", () => {
      const {getByTestId} = render(<Options />);
      const newsAndEventsText = getByTestId("events-text");
      expect(newsAndEventsText).toHaveTextContent(/News and Events/);
    });
    it("renders Hours text", () => {
      const {getByTestId} = render(<Options />);
      const hoursText = getByTestId("hours-text");
      expect(hoursText).toHaveTextContent(/Hours/);
    });
    it("renders Department Locations text", () => {
      const {getByTestId} = render(<Options />);
      const locationsText = getByTestId("locations-text");
      expect(locationsText).toHaveTextContent(/Department Locations/);
    });
    it("renders Directory text", () => {
      const {getByTestId} = render(<Options />);
      const directoryText = getByTestId("directory-text");
      expect(directoryText).toHaveTextContent(/Directory/);
    });
    it("renders Notifications text", () => {
      const {getByTestId} = render(<Options />);
      const notificationsText = getByTestId("notifications-text");
      expect(notificationsText).toHaveTextContent(/Notifications/);
    });
  });
  describe("Rendering Icons Test", () => {
    it("renders blog icon", () => {
      const {getByTestId} = render(<Options />);
      const blogIcon = getByTestId("blog-icon");
      expect(blogIcon).toBeOnTheScreen();
    });
    it("renders event icon", () => {
      const {getByTestId} = render(<Options />);
      const newsEventIcon = getByTestId("event-icon");
      expect(newsEventIcon).toBeOnTheScreen();
    });
    it("renders hours icon", () => {
      const {getByTestId} = render(<Options />);
      const hoursIcon = getByTestId("hours-icon");
      expect(hoursIcon).toBeOnTheScreen();
    });
    it("renders department locations icon", () => {
      const {getByTestId} = render(<Options />);
      const locationsIcon = getByTestId("locations-icon");
      expect(locationsIcon).toBeOnTheScreen();
    });
    it("renders directory icon", () => {
      const {getByTestId} = render(<Options />);
      const directoryIcon = getByTestId("directory-icon");
      expect(directoryIcon).toBeOnTheScreen();
    });
    it("renders noifications icon", () => {
      const {getByTestId} = render(<Options />);
      const notificationsIcon = getByTestId("notifications-icon");
      expect(notificationsIcon).toBeOnTheScreen();
    });
  });
  describe("Click Events", () => {
    it(`Clicking the News and Events Icon calls the following function: navigation.navigate("NewsAndEvents")`, async () => {
      navigation = {
        navigate: jest.fn(),
      };
      const {getByTestId} = render(<Options navigation={navigation} />);
      const newsEventIcon = getByTestId("event-icon");
      fireEvent(newsEventIcon, "press");
      expect(navigation.navigate).toHaveBeenCalledWith("NewsAndEvents");
    });
  });
});
