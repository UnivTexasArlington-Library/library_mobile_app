import Options from "../components/Options";
import {
  render,
  fireEvent,
  waitFor,
  screen,
} from "@testing-library/react-native";
import NewsAndEventsScreen from "./NewsAndEventsScreen";
import {FlashList} from "@shopify/flash-list";
import {View, Text} from "react-native";

describe("NewsAndEventsScreen Component", () => {
  describe("Async Request", () => {
    it(`Clicking the News and Events Icon calls the following function: navigation.navigate("NewsAndEvents")`, async () => {
      const renderBlogItem = jest.fn();
      render(
        <NewsAndEventsScreen>
          <FlashList renderItem={renderBlogItem} />
        </NewsAndEventsScreen>
      );
      await waitFor(() => {
        expect(renderBlogItem).toBeCalled();
      });
      //   const blogItem = await waitFor(() =>
      //     screen.findAllByTestId("newsAndEvents-blogItem")
      //   );
      //   expect(blogItem).toBeTruthy();
    });
  });
});
