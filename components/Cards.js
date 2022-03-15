import Image from "next/image";
import styles from "./Cards.module.css";
function Cards({
  author,
  description,
  publishedAt,
  title,
  url,
  imgUrl,
  source,
}) {
  const readableDate = new Date(publishedAt).toLocaleString(
    navigator.language,
    { dateStyle: "short", timeStyle: "short" }
  );

  const { origin: originPage } = new URL(url);
  let newSrc = null;
  // console.log(originPage);
  if (imgUrl) {
    !imgUrl.startsWith("https://")
      ? (newSrc = originPage + imgUrl)
      : (newSrc = imgUrl);
  }
  // console.log(newSrc);
  const notFount = `https://www.publicdomainpictures.net/pictures/280000/nahled/not-found-image-15383864787lu.jpg`;
  return (
    <article className={`${styles.newsCard} newsCard`}>
      <div className={styles.imgWrapper}>
        <Image
          loader={({ src, width, quality }) => {
            return `${src}?w=${width}`;
          }}
          src={newSrc || notFount}
          alt="imagen de la noticia"
          width={250}
          height={200}
          objectFit="cover"
          quality={25}
        />
      </div>
      <section className={styles.infoSection}>
        <h3 className={`largeText`}>{title}</h3>
        <div className={`smallText ${styles.cardSource}`}>
          <span className={``}>source: {source.name}</span>
          <span>
            <time className={``} dateTime={publishedAt}>
              {readableDate}
            </time>
          </span>
        </div>
        <p className={`mediumText`}>
          {description}{" "}
          <a
            className={styles.cardLink}
            href={url}
            target="_blank"
            rel="noreferrer"
          >
            leer más
          </a>
        </p>
        {author && (
          <p className={`mediumText ${styles.mgTp}`}>
            author:
            <strong> {author}</strong>
          </p>
        )}
      </section>
    </article>
  );
}

export default Cards;
