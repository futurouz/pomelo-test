import cx from 'classnames'

import { fetchSingleArticle } from '../../actions'
import Layout from '../../components/Layout'
import styles from '../../styles/Article.module.css'

export default function ArticleDetails(props: {
  docs: Awaited<ReturnType<typeof fetchSingleArticle>>
  isError?: boolean
}) {
  if (props.isError) {
    return (
      <Layout title="Something went wrong">
        <p className="ax-article-details__error_message">
          Cannot retrieve your article. Please try again later.
        </p>
      </Layout>
    )
  }

  const docs = props.docs[0]
  if (!docs) {
    return (
      <Layout title="Something went wrong">
        <p>Cannot get your article. Please try again later.</p>
      </Layout>
    )
  }

  return (
    <Layout title={docs.headline.main}>
      <div className={styles.article__container}>
        <div className={styles.article__top_content_container}>
          <p
            className={cx(
              styles.article__section_name,
              'ax-article__section_name'
            )}
          >
            {docs.section_name}
          </p>
          <h1 className={cx(styles.article__header, 'ax-article__header')}>
            {docs.headline.main}
          </h1>
          <h2 className={cx(styles.article__abstract, 'ax-article__abstract')}>
            {docs.abstract}
          </h2>
        </div>

        <div className={cx(styles.article__original, 'ax-article__original')}>
          {docs.byline.original}
        </div>
        <time
          className={cx(styles.article__pub_date, 'ax-article__pub_date')}
          dateTime={docs.pub_date}
        >
          Published: {new Date(docs.pub_date).toDateString()}
        </time>
        <p
          className={cx(
            styles.article__lead_paragraph,
            'ax-article__lead_paragraph'
          )}
        >
          {docs.lead_paragraph}
        </p>

        <a
          className={cx(styles.article__web_url, 'ax_article__web_url')}
          href={docs.web_url}
          target="_blank"
          rel="noreferrer"
        >
          Further reading
        </a>
      </div>
    </Layout>
  )
}

export async function getServerSideProps(data: { query: { uri: string } }) {
  try {
    const docs = await fetchSingleArticle(data.query.uri)

    return { props: { docs } }
  } catch (error) {
    return { props: { docs: [], isError: error } }
  }
}
