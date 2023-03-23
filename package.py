from google_play_scraper import search


def get_package_name(app_name):
    # get the package name of an app from the application name
    results = search(
        app_name,
        lang='en',
        country='us',
        n_hits=1,
    )

    return results[0]['appId'] if len(results) else None


if __name__ == '__main__':
    app_name = input('Enter the name of the application: ')
    package_name = get_package_name(app_name)
    if package_name:
        print(f'The package name of {app_name} is: {package_name}')
    else:
        print(f'Could not find package name for {app_name}')
