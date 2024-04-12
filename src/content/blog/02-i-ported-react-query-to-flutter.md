---
published: true
title: Port of React Query for Flutter
author: Rasul Sofiyev
description: In this post, we'll delve into the core features of React Query and discuss how they can be adapted to Flutter's state management and data handling paradigms using package I created.
image:
    url: ../assets/coding-flutter.jpg
    alt: Coding with Flutter
    caption: Image by <a href="https://unsplash.com/photos/a-computer-screen-with-a-bunch-of-code-on-it-6Gkj0zb2JXI?utm_content=creditShareLink&utm_medium=referral&utm_source=unsplash">Tony Pepe</a>
pubDate: 2022-10-22
tags: ["react", "flutter", "react-query"]
---
# Motivation
I have always been a huge fan of [React Query](https://github.com/TanStack/query) since the first day i tried it and absence of such helper in Flutter ecosystem made writing Flutter apps complicated. Previously, i used Bloc for fetching server data and it was very challenging to implement (especially for paginated data). So, i tried implementing React Query port for Flutter called [Remoter](https://github.com/sofiyevsr/flutter_remoter). Here are the features i have implemented so far:

- Global and individual options
- Cache is collected after cache time if there is no listener
- Query is refetched if query is stale
- Fetch only once when multiple widget mounts at the same time
- Pagination
- Invalidate query (refetch even if query is not stale)
- Set query data manually
- Retry query when new widget mounts
- Auto retry with exponential backoff
- Mutation widget similar to useMutation hook

# Let’s get into code
Here is a simple example of how to get started. Before we get started, you should wrap your app with RemoterProvider (just InheritedWidget that passes the given client down the tree), so that RemoterClient (holds defaults, cache and etc.) can be accessed anywhere the widget tree.

```dart
class MyApp extends StatelessWidget {
  const MyApp({super.key});  
  @override
  Widget build(BuildContext context) {
    return RemoterProvider(
      client: RemoterClient(
        // This line defines default options for all queries
        // You can override options in each query
        options: RemoterOptions(
            // staleTime defines how many ms after query fetched can be refetched
            // Use infinite staleTime if you don't need queries to be refetched when new query mounts
            // 1 << 31 is max int32
            // default is 0ms
            staleTime: 0,
            // cacheTime defines how many ms after all listeners are gone query data should be cleared,
            // default is 5 minutes
            cacheTime: 5 * 60 * 1000,
            // Maximum delay between retries in ms
            maxDelay: 5 * 60 * 1000,
            // Maximum amount of retries
            maxRetries: 3,
            // Flag that decides if query that has error status should be refetched on mount
            retryOnMount: true,
        ),
      ),
      child: const MaterialApp(
        home: MyHomePage(),
      ),
    );
  }
}
```
Then we can use the following widgets: RemoterQuery, PaginatedRemoterQuery, RemoterMutation. Here is the simple example with RemoterQuery:
```dart
RemoterQuery<T>(
      remoterKey: "unique key",
      execute: () async {
        // Fetch data here
      },
      builder: (context, snapshot, utils) {
        if (snapshot.status == RemoterStatus.fetching) {
          // Handle fetching state here
        }
        if (snapshot.status == RemoterStatus.error) {
          // Handle error here
        }
        // It is okay to use snapshot.data! here
        return ...
      },
    )
```
# Conclusion
You can read more about usage of the widgets [here](https://github.com/sofiyevsr/flutter_remoter). Also [here](https://github.com/sofiyevsr/flutter_remoter/tree/master/examples) you can find examples for some common use cases. Thanks for taking time and reading till here. Since this package is just an experiment, i would be glad to hear your feedback if you tried the package.
