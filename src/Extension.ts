import { BookCreator } from "./BookCreator";
import { BookDiscriminator } from "./BookDiscriminator";
import { BookLoader } from "./BookLoader";
import { BookModifier } from "./BookModifier";
import { BookSaver } from "./BookSaver";
import { IndexGenerator } from "./IndexGenerator";
import { LayoutBuilder } from "./LayoutBuilder";
import { LayoutDecorator } from "./LayoutDecorator";
import { PageCreator } from "./PageCreator";
import { PageDecorator } from "./PageDecorator";
import { PageExplorer } from "./PageExplorer";
import { PageModifier } from "./PageModifier";
import { SearchIndexGenerator } from "./SearchIndexGenerator";
import { StyleTheme } from "./StyleTheme";
import { TextConverter } from "./TextConverter";

export type BookExtension =
  | BookCreator
  | BookLoader
  | BookModifier
  | BookSaver
  | PageCreator;

export type PageExtension =
  | LayoutBuilder
  | IndexGenerator
  | PageModifier
  | PageDecorator
  | SearchIndexGenerator;

export type Extension =
  | BookDiscriminator
  | BookExtension
  | LayoutDecorator
  | PageExplorer
  | PageExtension
  | StyleTheme
  | TextConverter;
