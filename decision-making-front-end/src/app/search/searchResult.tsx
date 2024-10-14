export const SearchResult: React.FC = () => {
  const link: string = "https://google.com";
  const title: string = "Title";
  const preview: string = "Preview of text here.";

  return (
    <div>
      <h1>
        <a href={link}>{title}</a>
      </h1>
      <p>{preview}</p>
    </div>
  );
};
