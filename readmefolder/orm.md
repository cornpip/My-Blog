## Cascade
```typescript
    @ManyToOne(() => User, (user) => user.posts, {
        onDelete: 'CASCADE',
    })
    user: User
```
참조하는 row가 지워지면 Many도 자동으로 지워진다.

```typescript
    @OneToMany(() => PostImage, (image) => image.post, {
        cascade: true,
    })
    images: PostImage[]
```
`cascade: true`일 때 다음과 같은 사용이 가능하다.
```typescript
    const postimage = new PostImage();
    postimage.imageName = imgName;

    const mdpost = new MarkdownPost();
    mdpost.images = [postimage]
    ...
    await this.markdownrepo.save(mdpost);
```
`imageRepo.save(postimage)`를 하지않아도 imageRepo에 postimage가 저장된다. _( 여러개 저장도 가능 )_  
cascade true가 아니면 postimage는 db에 저장되지 않는 것을 확인할 수 있다.