use reqwest::Error;

#[tokio::main]
async fn main() -> Result<(), Error> {
    fetch_content().await
}

async fn fetch_content() -> Result<(), Error> {
    let url = "https://last-week-i-learned.ghost.io/ghost/api/content/posts";
    let client = reqwest::Client::new();
    let response = client.get(url).send().await?;

    if response.status().is_success() {
        let content = response.text().await?;
        println!("Content: {}", content);
    } else {
        println!("Request failed with status code: {}", response.status());
    }

    Ok(())
}