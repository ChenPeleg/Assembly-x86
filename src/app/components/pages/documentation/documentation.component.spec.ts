import { DocumentationComponent } from "./documentation.component";

describe("DocumentationComponent", () => {
  describe("returnToDocs", () => {
    it("scrolls to the try-it block identified by the URL", () => {
      const component = Object.create(
        DocumentationComponent.prototype
      ) as DocumentationComponent;
      const tryItBlock = {
        scrollIntoView: jasmine.createSpy("scrollIntoView"),
      };
      (component as any).tryItState = "exm_2";
      (component as any).documentationSection = {
        nativeElement: { scrollIntoView: jasmine.createSpy("scrollIntoView") },
      };
      spyOn(document, "getElementById").and.returnValue(
        tryItBlock as unknown as HTMLElement
      );

      component.returnToDocs();

      expect(document.getElementById).toHaveBeenCalledWith("exm_2");
      expect(tryItBlock.scrollIntoView).toHaveBeenCalledWith({
        behavior: "smooth",
        block: "start",
      });
      expect(
        (component as any).documentationSection.nativeElement.scrollIntoView
      ).not.toHaveBeenCalled();
    });

    it("falls back to the documentation section when the block is unavailable", () => {
      const component = Object.create(
        DocumentationComponent.prototype
      ) as DocumentationComponent;
      const documentationSection = {
        scrollIntoView: jasmine.createSpy("scrollIntoView"),
      };
      (component as any).tryItState = "exm_2";
      (component as any).documentationSection = {
        nativeElement: documentationSection,
      };
      spyOn(document, "getElementById").and.returnValue(null);

      component.returnToDocs();

      expect(documentationSection.scrollIntoView).toHaveBeenCalledWith({
        behavior: "smooth",
        block: "start",
      });
    });
  });
});
