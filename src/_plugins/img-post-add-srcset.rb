Jekyll::Hooks.register :posts, :pre_render, priority: :lowest do |post, payload|
  docExt = post.extname.tr('.', '')
  post.content.gsub!(/(\[)?!\[(.*)\]\(([^\)]+)\)(?:{:([^}]+)})*/, '{% include srcset-post-image.html path="\3" alt="\4" gallery="\2" %}')
  post.content.gsub! 'path: /', 'path: ' #you can probably optimise this a bit
end
