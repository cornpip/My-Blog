export const sample_txt = `# Example
### write markdown here
+ you can preview the markdown
\`\`\`javascript
function timer(m) {
    return (
        new Promise((resolve, reject) => {
            setTimeout(() => {
                console.log("~~");
                resolve("finish");
            }, m);
        })
    )
}
\`\`\`
\`\`\`java
public class Main {
    public static void main(String[] args) {
        System.out.println("hello");
    }
}
\`\`\`
> __quote__
>> double quotes

![3](https://github.com/cornpip/react_io/assets/74674780/4e966312-8a66-44b8-ac59-cc86f5a0758a)

| head1 | head2 | head3 |
|---|:---:|:---:|
| \`data1\` | 100 | A |
| \`data2\` | 101 | B |
| \`data3\` | 102 | C |  
  
</br>
</br>
</br>
`