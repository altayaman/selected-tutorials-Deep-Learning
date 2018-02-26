document.write('<link rel="stylesheet" href="https://assets-cdn.github.com/assets/gist-embed-9f0a4ad9c85ca776e669003688baa9d55f9db315562ce4d231d37dab2714c70a.css">')
document.write('<div id=\"gist36216647\" class=\"gist\">\n    <div class=\"gist-file\">\n      <div class=\"gist-data\">\n        <div class=\"js-gist-file-update-container js-task-list-container file-box\">\n  <div id=\"file-tensorflow_example-py\" class=\"file\">\n    \n\n  <div itemprop=\"text\" class=\"blob-wrapper data type-python\">\n      <table class=\"highlight tab-size js-file-line-container\" data-tab-size=\"8\">\n      <tr>\n        <td id=\"file-tensorflow_example-py-L1\" class=\"blob-num js-line-number\" data-line-number=\"1\"><\/td>\n        <td id=\"file-tensorflow_example-py-LC1\" class=\"blob-code blob-code-inner js-file-line\"><span class=\"pl-k\">import<\/span> tensorflow <span class=\"pl-k\">as<\/span> tf<\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-tensorflow_example-py-L2\" class=\"blob-num js-line-number\" data-line-number=\"2\"><\/td>\n        <td id=\"file-tensorflow_example-py-LC2\" class=\"blob-code blob-code-inner js-file-line\"><span class=\"pl-k\">import<\/span> numpy <span class=\"pl-k\">as<\/span> np<\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-tensorflow_example-py-L3\" class=\"blob-num js-line-number\" data-line-number=\"3\"><\/td>\n        <td id=\"file-tensorflow_example-py-LC3\" class=\"blob-code blob-code-inner js-file-line\">\n<\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-tensorflow_example-py-L4\" class=\"blob-num js-line-number\" data-line-number=\"4\"><\/td>\n        <td id=\"file-tensorflow_example-py-LC4\" class=\"blob-code blob-code-inner js-file-line\"><span class=\"pl-c\"><span class=\"pl-c\">#<\/span> Make 100 phony data points in NumPy.<\/span><\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-tensorflow_example-py-L5\" class=\"blob-num js-line-number\" data-line-number=\"5\"><\/td>\n        <td id=\"file-tensorflow_example-py-LC5\" class=\"blob-code blob-code-inner js-file-line\">x_data <span class=\"pl-k\">=<\/span> np.float32(np.random.rand(<span class=\"pl-c1\">2<\/span>, <span class=\"pl-c1\">100<\/span>)) <span class=\"pl-c\"><span class=\"pl-c\">#<\/span> Random input<\/span><\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-tensorflow_example-py-L6\" class=\"blob-num js-line-number\" data-line-number=\"6\"><\/td>\n        <td id=\"file-tensorflow_example-py-LC6\" class=\"blob-code blob-code-inner js-file-line\">y_data <span class=\"pl-k\">=<\/span> np.dot([<span class=\"pl-c1\">0.100<\/span>, <span class=\"pl-c1\">0.200<\/span>], x_data) <span class=\"pl-k\">+<\/span> <span class=\"pl-c1\">0.300<\/span><\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-tensorflow_example-py-L7\" class=\"blob-num js-line-number\" data-line-number=\"7\"><\/td>\n        <td id=\"file-tensorflow_example-py-LC7\" class=\"blob-code blob-code-inner js-file-line\">\n<\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-tensorflow_example-py-L8\" class=\"blob-num js-line-number\" data-line-number=\"8\"><\/td>\n        <td id=\"file-tensorflow_example-py-LC8\" class=\"blob-code blob-code-inner js-file-line\"><span class=\"pl-c\"><span class=\"pl-c\">#<\/span> Construct a linear model.<\/span><\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-tensorflow_example-py-L9\" class=\"blob-num js-line-number\" data-line-number=\"9\"><\/td>\n        <td id=\"file-tensorflow_example-py-LC9\" class=\"blob-code blob-code-inner js-file-line\">b <span class=\"pl-k\">=<\/span> tf.Variable(tf.zeros([<span class=\"pl-c1\">1<\/span>]))<\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-tensorflow_example-py-L10\" class=\"blob-num js-line-number\" data-line-number=\"10\"><\/td>\n        <td id=\"file-tensorflow_example-py-LC10\" class=\"blob-code blob-code-inner js-file-line\">W <span class=\"pl-k\">=<\/span> tf.Variable(tf.random_uniform([<span class=\"pl-c1\">1<\/span>, <span class=\"pl-c1\">2<\/span>], <span class=\"pl-k\">-<\/span><span class=\"pl-c1\">1.0<\/span>, <span class=\"pl-c1\">1.0<\/span>))<\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-tensorflow_example-py-L11\" class=\"blob-num js-line-number\" data-line-number=\"11\"><\/td>\n        <td id=\"file-tensorflow_example-py-LC11\" class=\"blob-code blob-code-inner js-file-line\">y <span class=\"pl-k\">=<\/span> tf.matmul(W, x_data) <span class=\"pl-k\">+<\/span> b<\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-tensorflow_example-py-L12\" class=\"blob-num js-line-number\" data-line-number=\"12\"><\/td>\n        <td id=\"file-tensorflow_example-py-LC12\" class=\"blob-code blob-code-inner js-file-line\">\n<\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-tensorflow_example-py-L13\" class=\"blob-num js-line-number\" data-line-number=\"13\"><\/td>\n        <td id=\"file-tensorflow_example-py-LC13\" class=\"blob-code blob-code-inner js-file-line\"><span class=\"pl-c\"><span class=\"pl-c\">#<\/span> Minimize the squared errors.<\/span><\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-tensorflow_example-py-L14\" class=\"blob-num js-line-number\" data-line-number=\"14\"><\/td>\n        <td id=\"file-tensorflow_example-py-LC14\" class=\"blob-code blob-code-inner js-file-line\">loss <span class=\"pl-k\">=<\/span> tf.reduce_mean(tf.square(y <span class=\"pl-k\">-<\/span> y_data))<\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-tensorflow_example-py-L15\" class=\"blob-num js-line-number\" data-line-number=\"15\"><\/td>\n        <td id=\"file-tensorflow_example-py-LC15\" class=\"blob-code blob-code-inner js-file-line\">optimizer <span class=\"pl-k\">=<\/span> tf.train.GradientDescentOptimizer(<span class=\"pl-c1\">0.5<\/span>)<\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-tensorflow_example-py-L16\" class=\"blob-num js-line-number\" data-line-number=\"16\"><\/td>\n        <td id=\"file-tensorflow_example-py-LC16\" class=\"blob-code blob-code-inner js-file-line\">train <span class=\"pl-k\">=<\/span> optimizer.minimize(loss)<\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-tensorflow_example-py-L17\" class=\"blob-num js-line-number\" data-line-number=\"17\"><\/td>\n        <td id=\"file-tensorflow_example-py-LC17\" class=\"blob-code blob-code-inner js-file-line\">\n<\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-tensorflow_example-py-L18\" class=\"blob-num js-line-number\" data-line-number=\"18\"><\/td>\n        <td id=\"file-tensorflow_example-py-LC18\" class=\"blob-code blob-code-inner js-file-line\"><span class=\"pl-c\"><span class=\"pl-c\">#<\/span> For initializing the variables.<\/span><\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-tensorflow_example-py-L19\" class=\"blob-num js-line-number\" data-line-number=\"19\"><\/td>\n        <td id=\"file-tensorflow_example-py-LC19\" class=\"blob-code blob-code-inner js-file-line\">init <span class=\"pl-k\">=<\/span> tf.initialize_all_variables()<\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-tensorflow_example-py-L20\" class=\"blob-num js-line-number\" data-line-number=\"20\"><\/td>\n        <td id=\"file-tensorflow_example-py-LC20\" class=\"blob-code blob-code-inner js-file-line\">\n<\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-tensorflow_example-py-L21\" class=\"blob-num js-line-number\" data-line-number=\"21\"><\/td>\n        <td id=\"file-tensorflow_example-py-LC21\" class=\"blob-code blob-code-inner js-file-line\"><span class=\"pl-c\"><span class=\"pl-c\">#<\/span> Launch the graph<\/span><\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-tensorflow_example-py-L22\" class=\"blob-num js-line-number\" data-line-number=\"22\"><\/td>\n        <td id=\"file-tensorflow_example-py-LC22\" class=\"blob-code blob-code-inner js-file-line\">sess <span class=\"pl-k\">=<\/span> tf.Session()<\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-tensorflow_example-py-L23\" class=\"blob-num js-line-number\" data-line-number=\"23\"><\/td>\n        <td id=\"file-tensorflow_example-py-LC23\" class=\"blob-code blob-code-inner js-file-line\">sess.run(init)<\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-tensorflow_example-py-L24\" class=\"blob-num js-line-number\" data-line-number=\"24\"><\/td>\n        <td id=\"file-tensorflow_example-py-LC24\" class=\"blob-code blob-code-inner js-file-line\">\n<\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-tensorflow_example-py-L25\" class=\"blob-num js-line-number\" data-line-number=\"25\"><\/td>\n        <td id=\"file-tensorflow_example-py-LC25\" class=\"blob-code blob-code-inner js-file-line\"><span class=\"pl-c\"><span class=\"pl-c\">#<\/span> Fit the plane.<\/span><\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-tensorflow_example-py-L26\" class=\"blob-num js-line-number\" data-line-number=\"26\"><\/td>\n        <td id=\"file-tensorflow_example-py-LC26\" class=\"blob-code blob-code-inner js-file-line\"><span class=\"pl-k\">for<\/span> step <span class=\"pl-k\">in<\/span> <span class=\"pl-v\">xrange<\/span>(<span class=\"pl-c1\">0<\/span>, <span class=\"pl-c1\">201<\/span>):<\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-tensorflow_example-py-L27\" class=\"blob-num js-line-number\" data-line-number=\"27\"><\/td>\n        <td id=\"file-tensorflow_example-py-LC27\" class=\"blob-code blob-code-inner js-file-line\">    sess.run(train)<\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-tensorflow_example-py-L28\" class=\"blob-num js-line-number\" data-line-number=\"28\"><\/td>\n        <td id=\"file-tensorflow_example-py-LC28\" class=\"blob-code blob-code-inner js-file-line\">    <span class=\"pl-k\">if<\/span> step <span class=\"pl-k\">%<\/span> <span class=\"pl-c1\">20<\/span> <span class=\"pl-k\">==<\/span> <span class=\"pl-c1\">0<\/span>:<\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-tensorflow_example-py-L29\" class=\"blob-num js-line-number\" data-line-number=\"29\"><\/td>\n        <td id=\"file-tensorflow_example-py-LC29\" class=\"blob-code blob-code-inner js-file-line\">        <span class=\"pl-c1\">print<\/span> step, sess.run(W), sess.run(b)<\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-tensorflow_example-py-L30\" class=\"blob-num js-line-number\" data-line-number=\"30\"><\/td>\n        <td id=\"file-tensorflow_example-py-LC30\" class=\"blob-code blob-code-inner js-file-line\">\n<\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-tensorflow_example-py-L31\" class=\"blob-num js-line-number\" data-line-number=\"31\"><\/td>\n        <td id=\"file-tensorflow_example-py-LC31\" class=\"blob-code blob-code-inner js-file-line\"><span class=\"pl-c\"><span class=\"pl-c\">#<\/span> Learns best fit is W: [[0.100  0.200]], b: [0.300]<\/span><\/td>\n      <\/tr>\n<\/table>\n\n  <\/div>\n\n  <\/div>\n  \n<\/div>\n\n      <\/div>\n      <div class=\"gist-meta\">\n        <a href=\"https://gist.github.com/Sentimentron/6818f567dfb96823bb4e5723f716305e/raw/bfedc4308295f66b713999fcd7f4bafecdb5eeee/tensorflow_example.py\" style=\"float:right\">view raw<\/a>\n        <a href=\"https://gist.github.com/Sentimentron/6818f567dfb96823bb4e5723f716305e#file-tensorflow_example-py\">tensorflow_example.py<\/a>\n        hosted with &#10084; by <a href=\"https://github.com\">GitHub<\/a>\n      <\/div>\n    <\/div>\n<\/div>\n')
